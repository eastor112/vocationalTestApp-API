const users = require('../api/users');
const universities = require('../api/universities');
const localAuth = require('../auth/local');
const googleAuth = require('../auth/google');
const search = require('../api/search');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/api/search', search);
  app.use('/auth/local/login', localAuth);
  app.use('/auth/google/login', googleAuth);
}

module.exports = routes;
