import db from '../config/database.js'

class Event {
  static tableName = 'events'

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        location TEXT,
        start_at DATETIME,   -- combined date+time
        end_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    db.exec(sql)
    console.log(`✅ Table '${this.tableName}' ready`)
  }

  static findAll() { return db.prepare(`SELECT * FROM ${this.tableName} ORDER BY start_at`).all() }
  static findById(id) { return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) }

  static create({ title, description, location, start_at = null, end_at = null }) {
    const stmt = db.prepare(`
      INSERT INTO ${this.tableName} (title, description, location, start_at, end_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    const r = stmt.run(title, description || null, location || null, start_at || null, end_at || null)
    return this.findById(r.lastInsertRowid)
  }

  static update(id, { title, description, location, start_at, end_at }) {
    const updates = []
    const values = []
    if (title !== undefined) { updates.push('title = ?'); values.push(title) }
    if (description !== undefined) { updates.push('description = ?'); values.push(description) }
    if (location !== undefined) { updates.push('location = ?'); values.push(location) }
    if (start_at !== undefined) { updates.push('start_at = ?'); values.push(start_at) }
    if (end_at !== undefined) { updates.push('end_at = ?'); values.push(end_at) }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(id)

    db.prepare(`UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`).run(...values)
    return this.findById(id)
  }

  static delete(id) {
    const r = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)
    return r.changes > 0
  }

  static count() { return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c }

  static seed() {
    if (this.count() === 0) {
      console.log('📅 Seeding events...')
      const sample = [
        { title: 'Hackathon', description: '24-hour coding', location: 'Campus Hall', start_at: '2025-12-01T09:00:00', end_at: '2025-12-01T21:00:00' },
        { title: 'Meetup', description: 'Tech talks', location: 'Room 101', start_at: '2025-12-10T18:00:00', end_at: '2025-12-10T20:30:00' }
      ]
      sample.forEach(e => this.create(e))
      console.log('✅ Seeded events')
    }
  }
}

export default Event
