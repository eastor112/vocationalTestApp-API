const QuestionsModel = require('./questions.model');

const getAllQuestions = async (limit, page) => {
  const [total, question] = await Promise.all([
    QuestionsModel.countDocuments({ state: true }),
    QuestionsModel.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('test', 'title type'),
  ]);

  return {
    totalDocs: total,
    totalPages: Math.ceil(total / limit),
    currenPage: Number(page),
    docs: question,
  };
};

async function getOneQuestion(id) {
  const question = await QuestionsModel.findOne({ _id: id, state: true })
    .populate('test', 'title type');

  return question;
}

async function deleteQuestion(id) {
  const question = await QuestionsModel.findByIdAndUpdate(id, { state: false }, { new: true });

  return question;
}

async function createQuestion(newQuestion) {
  const question = await QuestionsModel.create(newQuestion)
    .populate('test', 'title type');

  return question;
}

async function updateQuestion(id, question) {
  const updatedQuestion = await QuestionsModel.findByIdAndUpdate(
    id,
    question,
    { new: true },
  ).populate('test', 'title type');

  return updatedQuestion;
}

module.exports = {
  getAllQuestions,
  getOneQuestion,
  deleteQuestion,
  createQuestion,
  updateQuestion,
};
