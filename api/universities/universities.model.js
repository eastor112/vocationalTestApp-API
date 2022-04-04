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
  address: {
    country: String,
    city: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  offer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  }],
  url: {
    required: true,
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('University', UniversitySchema);
