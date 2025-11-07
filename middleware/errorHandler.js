const { ErrorCodes, ErrorMessages } = require('../constants/errorCodes');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === '23505') {
    return res.status(409).json({ 
      error: ErrorMessages[ErrorCodes.TASK_ALREADY_EXISTS],
      code: ErrorCodes.TASK_ALREADY_EXISTS
    });
  }
  
  if (err.code === '23503') {
    return res.status(400).json({ 
      error: ErrorMessages[ErrorCodes.INVALID_REFERENCE],
      code: ErrorCodes.INVALID_REFERENCE
    });
  }
  
  res.status(500).json({ 
    error: ErrorMessages[ErrorCodes.INTERNAL_SERVER_ERROR],
    code: ErrorCodes.INTERNAL_SERVER_ERROR
  });
};

module.exports = errorHandler;

