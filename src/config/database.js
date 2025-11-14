import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Determine database path
let dbPath
if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl
} else {
  dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

// Connect to SQLite
const db = new Database(dbPath)
db.pragma('foreign_keys = ON')

export const initializeDatabase = async () => {
  console.log('🔧 Initializing database...')

  // Import all models
  const User = (await import('../models/User.js')).default
  const Book = (await import('../models/Book.js')).default
  const Movie = (await import('../models/Movie.js')).default
  const Song = (await import('../models/Song.js')).default
  const Recipe = (await import('../models/Recipe.js')).default

  // Create tables
  User.createTable()
  Book.createTable()
  Movie.createTable()
  Song.createTable()
  Recipe.createTable()

  // Seed data only in development
  if (config.isDevelopment()) {
    User.seed()
    Book.seed()
    Movie.seed()
    Song.seed()
    Recipe.seed()
  }

  console.log('✅ Database initialization complete')
}

export default db
