const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Task with this ID already exists' });
  }
  
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Invalid reference' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;

