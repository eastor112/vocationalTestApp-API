require('dotenv').config();

const express = require('express');

const configExpress = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes/routes');

const app = express();

const env = process.env.NODE_ENV;

if (env !== 'test') {
  connectDB();
}

configExpress(app);
routes(app);

module.exports = app;
