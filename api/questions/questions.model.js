const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: String,
  idTest: Number,
  type: String,
  statement: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
});

module.exports = mongoose.model('Question', QuestionSchema);
