const users = require('./api/users');
const universities = require('./api/universities');
const localAuth = require('./auth/local');
const questions = require('./api/questions');
const vocationalTest = require('./api/vocationalTest');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/auth/local/login', localAuth);
  app.use('/api/questions', questions);
  app.use('/api/vocationalTest', vocationalTest);
}

module.exports = routes;
