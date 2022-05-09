const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  type: {
    type: String,
    enum: ['MULTIPLE-2', 'MULTIPLE-3', 'MULTIPLE-4', 'MULTIPLE-5'],
    default: 'MULTIPLE-4',
  },
  statement: {
    type: String,
    default: '',
  },
  optionA: {
    type: String,
    default: '',
  },
  optionB: {
    type: String,
    default: '',
  },
  optionC: {
    type: String,
    default: '',
  },
  optionD: {
    type: String,
    default: '',
  },
  optionE: {
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

module.exports = mongoose.model('Question', QuestionSchema);
