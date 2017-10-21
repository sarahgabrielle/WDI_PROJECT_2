const { env } = require('../config/environment');

// You MUST keep the last argument
function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if (env === 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;

  // Delete the next below...
  return res.render(`statics/${err.status}`);
}

module.exports = errorHandler;
