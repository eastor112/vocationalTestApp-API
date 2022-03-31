const QuestionsModel = require('./questions.model');

const getAllQuestions = async () => QuestionsModel.find();

async function getOneQuestion(id) {
  const question = await QuestionsModel.findById(id);
  return question;
}

async function deleteQuestion(id) {
  const question = await QuestionsModel.findByIdAndDelete(id);

  if (!question) {
    return null;
  }

  return question;
}

async function createQuestion(newQuestion) {
  return new QuestionsModel(newQuestion).save();
}

async function updateQuestion(id, question) {
  const updatedQuestion = await QuestionsModel.findByIdAndUpdate(
    id,
    question,
    { new: true },
  );
  return updatedQuestion;
}

module.exports = {
  getAllQuestions,
  getOneQuestion,
  deleteQuestion,
  createQuestion,
  updateQuestion,
};
