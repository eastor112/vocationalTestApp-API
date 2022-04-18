const mongoose = require('mongoose');

const QuestionResponseSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  userResponse: {
    type: String,
    required: true,
  },
  testDone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestDone',
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
