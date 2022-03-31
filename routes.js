const users = require('./api/users');
const universities = require('./api/universities');
const localAuth = require('./auth/local');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/auth/local/login', localAuth);
}

module.exports = routes;
