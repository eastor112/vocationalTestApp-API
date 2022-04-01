const users = require('./api/users');
const universities = require('./api/universities');
const localAuth = require('./auth/local');
const googleAuth = require('./auth/google');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/auth/local/login', localAuth);
  app.use('/auth/google/login', googleAuth);
}

module.exports = routes;
