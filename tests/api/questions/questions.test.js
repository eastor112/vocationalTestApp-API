const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');

const request = supertest(app);

describe('Questions enpoints tests', () => {
  test('should create a new Questions', async () => {

  });
});
