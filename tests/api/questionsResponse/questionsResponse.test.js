const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');

const request = supertest(app);

describe('Questionresponses enpoints tests', () => {
  test('should create a new Questionresponse', async () => {

  });
});
