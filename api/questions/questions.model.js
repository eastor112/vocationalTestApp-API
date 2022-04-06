const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  type: {
    type: String,
    enum: ['BINARI', 'MULTIPLE'],
  },
  statement: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
  },
  optionB: {
    type: String,
  },
  optionC: {
    type: String,
  },
  optionD: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

QuestionSchema.methods.toJSON = function () {
  const question = this;
  const { _id, state, __v, ...rest } = question.toObject();
  rest.id = _id;

  return rest;
};

QuestionSchema.methods.toJSON = function () {
  const question = this;
  const { _id, state, __v, ...rest } = question.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('Question', QuestionSchema);
