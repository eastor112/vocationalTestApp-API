const users = require('./api/users');
const careers = require('./api/careers');

function routes(app) {
  app.use('/api/careers', careers);
  app.use('/api/users', users);
}

module.exports = routes;
