const users = require('../api/users');
const universities = require('../api/universities');
const localAuth = require('../auth/local');
const googleAuth = require('../auth/google');
const search = require('../api/searches');
const billings = require('../api/billings');
const testResults = require('../api/testResults');
const offers = require('../api/offers');
const careers = require('../api/careers');
const questions = require('../api/questions');
const vocationalTest = require('../api/vocationalTest');

function routes(app) {
  app.use('/api/careers', careers);
  app.use('/api/offers', offers);
  app.use('/api/universities', universities);
  app.use('/api/users', users);
  app.use('/api/questions', questions);
  app.use('/api/vocationalTest', vocationalTest);
  app.use('/api/testresults', testResults);
  app.use('/api/billings', billings);
  app.use('/api/search', search);
  app.use('/auth/local/login', localAuth);
  app.use('/auth/google/login', googleAuth);
}

module.exports = routes;
