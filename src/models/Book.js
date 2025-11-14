import db from '../config/database.js'

class Book {
	static tableName = 'books'

	static createTable() {
		db.exec(`
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				author TEXT NOT NULL,
				year INTEGER,
				genre TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`)
		console.log(`✅ Table '${this.tableName}' ready`)
	}

	static findAll() { return db.prepare(`SELECT * FROM ${this.tableName}`).all() }
	static findById(id) { return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) }

	static create(data) {
		const { title, author, year, genre } = data
		const stmt = db.prepare(`INSERT INTO ${this.tableName} (title, author, year, genre) VALUES (?, ?, ?, ?)`)
		const result = stmt.run(title, author, year, genre)
		return this.findById(result.lastInsertRowid)
	}

	static update(id, data) {
		const { title, author, year, genre } = data
		const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET title=?, author=?, year=?, genre=?, updated_at=CURRENT_TIMESTAMP 
			WHERE id=?`)
		stmt.run(title, author, year, genre, id)
		return this.findById(id)
	}

	static delete(id) { return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id).changes > 0 }

	static count() { return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c }

	static seed() {
		if (this.count() === 0) {
			console.log('📚 Seeding books...')
			const sample = [
				{ title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
				{ title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
				{ title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
			]
			sample.forEach(b => this.create(b))
			console.log('✅ Seeded books')
		}
	}
}

export default Book
