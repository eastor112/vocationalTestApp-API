const users = require('./api/users');

function routes(app) {
  app.use('/api/users', users);
}

module.exports = routes;
