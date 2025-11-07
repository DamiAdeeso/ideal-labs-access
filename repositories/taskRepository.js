const pool = require('../db');

const findAll = async () => {
  const result = await pool.query('SELECT id, title, completed FROM tasks ORDER BY created_at DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query('SELECT id, title, completed FROM tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const create = async (title, completed) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id, title, completed',
    [title, completed]
  );
  return result.rows[0];
};

const update = async (id, title, completed) => {
  const result = await pool.query(
    'UPDATE tasks SET title = $1, completed = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, title, completed',
    [title, completed, id]
  );
  return result.rows[0] || null;
};

const updateCompleted = async (id, completed) => {
  const result = await pool.query(
    'UPDATE tasks SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, title, completed',
    [completed, id]
  );
  return result.rows[0] || null;
};

const deleteById = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);
  return result.rows[0] || null;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  updateCompleted,
  deleteById
};

