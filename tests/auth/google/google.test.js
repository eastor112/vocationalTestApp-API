const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');

const request = supertest(app);

describe('Google enpoints tests', () => {
  test('should create a new local account with google', async () => {

  });
});
