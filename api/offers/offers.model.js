const mongoose = require('mongoose');

const OffersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
  },
  photo: {
    type: String,
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
  const { _id, state, __v, ...rest } = offer.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('Offers', OffersSchema);
