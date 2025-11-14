import db from '../config/database.js'

class Recipe {
  static tableName = 'recipes'

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        instructions TEXT,
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
    const recipe = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
    if (!recipe) return null
    // include ingredients
    const ingredients = db.prepare(`SELECT * FROM ingredients WHERE recipe_id = ? ORDER BY id`).all(id)
    recipe.ingredients = ingredients
    return recipe
  }

  static create({ title, instructions, ingredients = [] }) {
    const stmt = db.prepare(`INSERT INTO ${this.tableName} (title, instructions) VALUES (?, ?)`)
    const r = stmt.run(title, instructions || null)
    const recipeId = r.lastInsertRowid

    // insert ingredients
    const ins = db.prepare(`INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)`)
    ingredients.forEach(ing => ins.run(recipeId, ing.name, ing.quantity || null))
    return this.findById(recipeId)
  }

  static update(id, { title, instructions, ingredients }) {
    const updates = []
    const values = []
    if (title !== undefined) { updates.push('title = ?'); values.push(title) }
    if (instructions !== undefined) { updates.push('instructions = ?'); values.push(instructions) }

    if (updates.length) {
      updates.push('updated_at = CURRENT_TIMESTAMP')
      values.push(id)
      db.prepare(`UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`).run(...values)
    }

    // If ingredients provided, replace them (simple approach)
    if (ingredients !== undefined) {
      const del = db.prepare(`DELETE FROM ingredients WHERE recipe_id = ?`)
      del.run(id)
      const ins = db.prepare(`INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)`)
      ingredients.forEach(ing => ins.run(id, ing.name, ing.quantity || null))
    }

    return this.findById(id)
  }

  static delete(id) {
    const r = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)
    // ingredients have FK ON DELETE CASCADE if set in ingredients table (we will set FK)
    return r.changes > 0
  }

  static count() { return db.prepare(`SELECT COUNT(*) as c FROM ${this.tableName}`).get().c }

  static seed() {
    if (this.count() === 0) {
      console.log('🍳 Seeding recipes...')
      const sample = [
        {
          title: 'Pancakes',
          instructions: 'Mix, fry, serve',
          ingredients: [
            { name: 'Flour', quantity: '200g' },
            { name: 'Milk', quantity: '300ml' },
            { name: 'Egg', quantity: '1' }
          ]
        },
        {
          title: 'Tomato Pasta',
          instructions: 'Cook pasta, add sauce',
          ingredients: [
            { name: 'Pasta', quantity: '200g' },
            { name: 'Tomato Sauce', quantity: '150ml' }
          ]
        }
      ]
      sample.forEach(r => this.create(r))
      console.log('✅ Seeded recipes')
    }
  }
}

export default Recipe
