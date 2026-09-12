/**
 * Centralized Error Handling Middleware
 *
 * In Express, an error-handling middleware is identified by taking four arguments:
 * (err, req, res, next). Express skips normal middlewares and invokes this one
 * whenever `next(err)` is called or an uncaught exception is thrown in a route handler.
 */
export const errorHandler = (err, req, res, next) => {
  // Determine status code: use res.statusCode if already set (e.g. 400, 401, 404),
  // otherwise default to 500 Internal Server Error
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Handle Mongo Duplicate Key Error (e.g. unique firebaseUid or email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. It must be unique.`;
  }

  // Log error on the server for debugging
  console.error(`[Server Error] [${req.method} ${req.url}]:`, err);

  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development environment for debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
