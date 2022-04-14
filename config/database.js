const mongoose = require('mongoose');

const env = process.env.NODE_ENV;

let URI = '';

if (env === 'test') {
  URI = process.env.MONGO_DB_URI_TEST;
} else {
  URI = process.env.MONGO_DB_URI;
}

async function connectDB() {
  try {
    await mongoose.connect(URI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
