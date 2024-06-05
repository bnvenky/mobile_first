const pool = require('../config/db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    )
  `);
};

createTable();

module.exports = {
  async findAll(limit, offset) {
    const result = await pool.query('SELECT * FROM items LIMIT $1 OFFSET $2', [limit, offset]);
    return result.rows;
  },
  async findById(id) {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
  },
  async create(item) {
    const result = await pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [item.name, item.description]);
    return result.rows[0];
  },
  async update(id, item) {
    const result = await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *', [item.name, item.description, id]);
    return result.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  }
};
