/**
 * 404 Not Found Middleware
 * Catches any incoming request that does not match an existing endpoint
 * and forwards an Error object to the centralized error handler.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Resource not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};
