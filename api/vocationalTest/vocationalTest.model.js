const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['FREE', 'PREMIUM'],
    default: 'FREE',
  },
  descriptions: {
    A: {
      type: String,
    },
    B: {
      type: String,
    },
    C: {
      type: String,
    },
    D: {
      type: String,
    },
    E: {
      type: String,
    },
  },
  results: {
    A: [String],
    B: [String],
    C: [String],
    D: [String],
    E: [String],
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

TestSchema.methods.toJSON = function () {
  const test = this;
  const { _id, state, __v, ...rest } = test.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('Test', TestSchema);
