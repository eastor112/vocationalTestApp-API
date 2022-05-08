const mongoose = require('mongoose');
const Offers = require('../offers/offers.model');

const UniversitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  logo: {
    type: String,
    default: '',
  },
  campus: [String],
  ranking: {
    national: {
      type: Number,
      default: 1,
    },
    worldwide: {
      type: Number,
      default: 1,
    },
  },
  mission: {
    type: String,
    default: '',
  },
  vision: {
    type: String,
    default: '',
  },
  process: [String],
  address: {
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    geo: {
      lat: {
        type: String,
        default: '',
      },
      lng: {
        type: String,
        default: '',
      },
    },
  },
  offer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  }],
  url: {
    type: String,
    default: '',
  },
  socialMedia: {
    linkedIn: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

UniversitySchema.pre('remove', async function (next) {
  const university = this;

  try {
    await Offers.deleteMany({ university: university._id });
    return next();
  } catch (error) {
    return next(error);
  }
});

UniversitySchema.methods.toJSON = function () {
  const university = this;
  const { _id, state, __v, ...rest } = university.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('University', UniversitySchema);
