const ErrorCodes = {
  TITLE_REQUIRED: 'TITLE_REQUIRED',
  TASK_NOT_FOUND: 'TASK_NOT_FOUND',
  TASK_ALREADY_EXISTS: 'TASK_ALREADY_EXISTS',
  INVALID_REFERENCE: 'INVALID_REFERENCE',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};

const ErrorMessages = {
  [ErrorCodes.TITLE_REQUIRED]: 'Title is required',
  [ErrorCodes.TASK_NOT_FOUND]: 'Task not found',
  [ErrorCodes.TASK_ALREADY_EXISTS]: 'Task with this ID already exists',
  [ErrorCodes.INVALID_REFERENCE]: 'Invalid reference',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Internal server error'
};

module.exports = { ErrorCodes, ErrorMessages };

