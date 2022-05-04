const mongoose = require('mongoose');

const OffersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '',
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true,
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  },
  state: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

OffersSchema.methods.toJSON = function () {
  const offer = this;
  const { state, __v, ...rest } = offer.toObject();

  return rest;
};

module.exports = mongoose.model('Offer', OffersSchema);
