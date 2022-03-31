const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  logo: String,
  campus: Array,
  ranking: {
    national: Number,
    worldwide: Number,
  },
  mission: String,
  vision: String,
  process: Array,
  location: {
    city: String,
    Department: String,
    Country: String,
  },
  offer: [{
    code: Number,
    career: String,
    duration: String,
    description: String,

  },
  {
    code: Number,
    career: String,
    duration: String,
    description: String,

  },
  ],
  url: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('University', UniversitySchema);
