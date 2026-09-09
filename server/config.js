import 'dotenv/config'

// one place for connection settings. Everything falls back to a sane local
// default so the project still runs if .env is missing.
export const dbConfig = {
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || process.env.USER,
  password: process.env.PGPASSWORD || undefined,
  database: process.env.PGDATABASE || 'cs3750_assignment1',
}

export const serverPort = Number(process.env.PORT) || 3001
