import db from '../config/database.js'

class Product {
  static tableName = 'products'

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sku TEXT UNIQUE,
        description TEXT,
        price REAL NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    db.exec(sql)
    console.log(`✅ Table '${this.tableName}' ready`)
  }

  static findAll() {
    return db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`).all()
  }

  static findById(id) {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
  }

  static findBySKU(sku) {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE sku = ?`).get(sku)
  }

  static create({ name, sku, description, price = 0, stock = 0 }) {
    const stmt = db.prepare(`
      INSERT INTO ${this.tableName} (name, sku, description, price, stock)
      VALUES (?, ?, ?, ?, ?)
    `)
    const r = stmt.run(name, sku || null, description || null, price, stock)
    return this.findById(r.lastInsertRowid)
  }

  static update(id, { name, sku, description, price, stock }) {
    const updates = []
    const values = []
    if (name !== undefined) { updates.push('name = ?'); values.push(name) }
    if (sku !== undefined) { updates.push('sku = ?'); values.push(sku) }
    if (description !== undefined) { updates.push('description = ?'); values.push(description) }
    if (price !== undefined) { updates.push('price = ?'); values.push(price) }
    if (stock !== undefined) { updates.push('stock = ?'); values.push(stock) }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(id)

    const stmt = db.prepare(`UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`)
    stmt.run(...values)
    return this.findById(id)
  }

  static delete(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
    const result = stmt.run(id)
    return result.changes > 0
  }

  static adjustStock(id, delta) {
    // delta can be positive or negative
    const prod = this.findById(id)
    if (!prod) return null
    const newStock = prod.stock + delta
    if (newStock < 0) throw new Error('Insufficient stock')
    const stmt = db.prepare(`UPDATE ${this.tableName} SET stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
    stmt.run(newStock, id)
    return this.findById(id)
  }

  static count() {
    return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c
  }

  static seed() {
    if (this.count() === 0) {
      console.log('📦 Seeding products...')
      const sample = [
        { name: 'T-shirt', sku: 'TSHIRT-001', description: 'Cotton tee', price: 12.99, stock: 100 },
        { name: 'Mug', sku: 'MUG-001', description: 'Ceramic mug', price: 6.5, stock: 60 },
        { name: 'USB Cable', sku: 'USB-001', description: '1m USB-C', price: 4.99, stock: 200 }
      ]
      sample.forEach(p => this.create(p))
      console.log('✅ Seeded products')
    }
  }
}

export default Product
