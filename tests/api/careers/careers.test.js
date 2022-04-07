const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');

const request = supertest(app);

describe('Careers enpoints tests', () => {
  test('should create a new career', async () => {

  });
});
