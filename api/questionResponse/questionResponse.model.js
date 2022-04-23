const mongoose = require('mongoose');

const QuestionResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  userResponse: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
    required: true,
  },
  testResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestResult',
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

QuestionResponseSchema.methods.toJSON = function () {
  const questionResponse = this;
  const { _id, __v, state, ...rest } = questionResponse.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('QuestionResponse', QuestionResponseSchema);
