const mongoose = require('mongoose');
const QuestionResponse = require('../questionResponse/questionResponse.model');

const TestResultsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  answers: {
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
  },
  firstOption: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
  },
  secondOption: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

TestResultsSchema.pre('remove', async function (next) {
  const testResult = this;

  try {
    await QuestionResponse.deleteMany({ testResult: testResult._id });
    return next();
  } catch (error) {
    return next(error);
  }
});

TestResultsSchema.methods.toJSON = function () {
  const testResult = this;
  const { _id, __v, state, ...rest } = testResult.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('TestResult', TestResultsSchema);
