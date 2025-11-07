const { ErrorCodes, ErrorMessages } = require('../constants/errorCodes');

const validateTask = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).json({ 
        error: ErrorMessages[ErrorCodes.TITLE_REQUIRED],
        code: ErrorCodes.TITLE_REQUIRED
      });
    }
  }
  next();
};

module.exports = validateTask;

