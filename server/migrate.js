import { readdir, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'
import { dbConfig } from './config.js'

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), 'migrations')

// connect to the built-in postgres database so we can create ours
// if this is a fresh machine.
async function createDatabaseIfMissing() {
  const admin = new pg.Client({ ...dbConfig, database: 'postgres' })
  await admin.connect()
  try {
    const { rowCount } = await admin.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbConfig.database],
    )
    if (rowCount === 0) {
      // Database names can't be parameterized, so quote it safely instead.
      await admin.query(`CREATE DATABASE ${pg.escapeIdentifier(dbConfig.database)}`)
      console.log(`[migrate] created database "${dbConfig.database}"`)
    } else {
      console.log(`[migrate] database "${dbConfig.database}" already exists`)
    }
  } finally {
    await admin.end()
  }
}

// run every .sql file in migrations/ that hasn't been run yet,
// recording each one so reruns are no-ops.
async function runMigrations() {
  const client = new pg.Client(dbConfig)
  await client.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name       TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `)

    const files = (await readdir(migrationsDir))
      .filter((f) => f.endsWith('.sql'))
      .sort()

    const { rows } = await client.query('SELECT name FROM schema_migrations')
    const applied = new Set(rows.map((r) => r.name))

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`[migrate] skip ${file} (already applied)`)
        continue
      }
      const sql = await readFile(join(migrationsDir, file), 'utf8')
      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file])
        await client.query('COMMIT')
        console.log(`[migrate] applied ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw new Error(`migration ${file} failed: ${err.message}`)
      }
    }
  } finally {
    await client.end()
  }
}

try {
  await createDatabaseIfMissing()
  await runMigrations()
  console.log('[migrate] done')
} catch (err) {
  console.error('\n[migrate] FAILED:', err.message)
  console.error('[migrate] Is PostgreSQL running? Check the PG* values in .env\n')
  process.exit(1)
}
