const users = require('./api/users');
const universities = require('./api/universities');
const questions = require('./api/questions');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/api/questions', questions);
}

module.exports = routes;
