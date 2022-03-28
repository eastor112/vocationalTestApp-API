const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

function configExpress(app) {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
  });
}

module.exports = configExpress;
