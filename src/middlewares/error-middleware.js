import { ApiError } from '../exceptions/api-errors.js';

export default (err, req, res, next) => {
  console.log('middleware');
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({
    message: err.message,
    errors: err.errors,
  });
};
