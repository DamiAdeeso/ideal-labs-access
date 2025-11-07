const validateTask = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
  }
  next();
};

module.exports = validateTask;

