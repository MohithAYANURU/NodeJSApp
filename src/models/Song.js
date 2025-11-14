import db from '../config/database.js'

class Song {
	static tableName = 'songs'

	static createTable() {
		db.exec(`
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				artist TEXT NOT NULL,
				album TEXT,
				duration TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`)
		console.log(`✅ Table '${this.tableName}' ready`)
	}

	static findAll() { return db.prepare(`SELECT * FROM ${this.tableName}`).all() }
	static findById(id) { return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) }

	static create(data) {
		const { title, artist, album, duration } = data
		const stmt = db.prepare(`INSERT INTO ${this.tableName} (title, artist, album, duration) VALUES (?, ?, ?, ?)`)
		const result = stmt.run(title, artist, album, duration)
		return this.findById(result.lastInsertRowid)
	}

	static update(id, data) {
		const { title, artist, album, duration } = data
		const stmt = db.prepare(`
			UPDATE ${this.tableName}
			SET title=?, artist=?, album=?, duration=?, updated_at=CURRENT_TIMESTAMP
			WHERE id=?`)
		stmt.run(title, artist, album, duration, id)
		return this.findById(id)
	}

	static delete(id) { return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id).changes > 0 }

	static count() { return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c }

	static seed() {
		if (this.count() === 0) {
			console.log('🎵 Seeding songs...')
			const sample = [
				{ title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
				{ title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:03' },
				{ title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54' },
			]
			sample.forEach(s => this.create(s))
			console.log('✅ Seeded songs')
		}
	}
}

export default Song
