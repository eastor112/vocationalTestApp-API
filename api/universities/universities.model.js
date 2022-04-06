const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  logo: String,
  campus: [String],
  ranking: {
    national: Number,
    worldwide: Number,
  },
  mission: String,
  vision: String,
  process: [String],
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
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

UniversitySchema.methods.toJSON = function () {
  const university = this;
  const { _id, state, __v, ...rest } = university.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('University', UniversitySchema);
