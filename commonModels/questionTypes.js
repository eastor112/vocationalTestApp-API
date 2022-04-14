const mongoose = require('mongoose');

const QuestionTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('QuestionType', QuestionTypeSchema);
