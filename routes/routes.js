const users = require('../api/users');
const universities = require('../api/universities');
const localAuth = require('../auth/local');
const googleAuth = require('../auth/google');
const search = require('../api/search');
const billings = require('../api/billings');
const testResults = require('../api/testResults');
const offers = require('../api/offers');

function routes(app) {
  app.use('/api/users', users);
  app.use('/api/universities', universities);
  app.use('/api/billings', billings);
  app.use('/api/testresults', testResults);
  app.use('/api/search', search);
  app.use('/api/offers', offers);
  app.use('/auth/local/login', localAuth);
  app.use('/auth/google/login', googleAuth);
}

module.exports = routes;
