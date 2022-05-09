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
      default: '',
    },
    B: {
      type: String,
      default: '',
    },
    C: {
      type: String,
      default: '',
    },
    D: {
      type: String,
      default: '',
    },
    E: {
      type: String,
      default: '',
    },
  },
  results: {
    A: [String],
    B: [String],
    C: [String],
    D: [String],
    E: [String],
  },
  author: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['PUBLISHED', 'UNPUBLISHED'],
    default: 'PUBLISHED',
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
