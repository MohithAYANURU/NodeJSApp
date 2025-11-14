import db from '../config/database.js'

class Movie {
	static tableName = 'movies'

	static createTable() {
		db.exec(`
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				director TEXT NOT NULL,
				year INTEGER,
				rating REAL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`)
		console.log(`✅ Table '${this.tableName}' ready`)
	}

	static findAll() { return db.prepare(`SELECT * FROM ${this.tableName}`).all() }
	static findById(id) { return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) }

	static create(data) {
		const { title, director, year, rating } = data
		const stmt = db.prepare(`INSERT INTO ${this.tableName} (title, director, year, rating) VALUES (?, ?, ?, ?)`)
		const result = stmt.run(title, director, year, rating)
		return this.findById(result.lastInsertRowid)
	}

	static update(id, data) {
		const { title, director, year, rating } = data
		const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET title=?, director=?, year=?, rating=?, updated_at=CURRENT_TIMESTAMP 
			WHERE id=?`)
		stmt.run(title, director, year, rating, id)
		return this.findById(id)
	}

	static delete(id) { return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id).changes > 0 }

	static count() { return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c }

	static seed() {
		if (this.count() === 0) {
			console.log('🎬 Seeding movies...')
			const sample = [
				{ title: 'Inception', director: 'Christopher Nolan', year: 2010, rating: 8.8 },
				{ title: 'The Matrix', director: 'Wachowskis', year: 1999, rating: 8.7 },
				{ title: 'Interstellar', director: 'Christopher Nolan', year: 2014, rating: 8.6 },
			]
			sample.forEach(m => this.create(m))
			console.log('✅ Seeded movies')
		}
	}
}

export default Movie
