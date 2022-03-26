/**
 * Main application routes
 */
const users = require('./api/users');
// const universities = require('./api/universities');

function routes(app) {
  // API Routes
  app.use('/api/users', users);
  // app.use('/api/universities', universities);
}

module.exports = routes;
