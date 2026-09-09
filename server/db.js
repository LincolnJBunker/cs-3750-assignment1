import pg from 'pg'
import { dbConfig } from './config.js'

// shared connection pool for the API routes.
export const pool = new pg.Pool(dbConfig)

// query helper function
export function query(text, params) {
  return pool.query(text, params)
}
