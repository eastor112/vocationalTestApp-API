const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../app');
const connectDB = require('../../../config/database');

const request = supertest(app);

describe('Billings enpoints tests', () => {
  test('should create a new billing', async () => {

  });
});
