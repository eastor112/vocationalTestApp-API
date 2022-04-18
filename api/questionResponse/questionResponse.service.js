const QuestionResponse = require('./questionResponse.model');

const geTAllQuestionsResponse = async (limit, page) => {
  const [total, questionResponse] = await Promise.all([
    await QuestionResponse.countDocuments({ state: true }),
    await QuestionResponse.find({ state: true })
      .limit(limit)
      .skip((page - 1) * limit),
  ]);
  return { total, questionResponse };
};

const getOneQuestionResponse = async (id) => {
  const questionResponse = await QuestionResponse.findById(id);
  return questionResponse;
};

const createQuestionResponse = async (rest) => {
  const questionResponse = await QuestionResponse.create(rest);
  return questionResponse;
};

const updateQuestionResponse = async (id, rest) => {
  const questionResponse = await QuestionResponse.findByIdAndUpdate(id, rest, { new: true });

  return questionResponse;
};

const deleteQuestionResponse = async (id) => {
  const questionResponse = await QuestionResponse.findByIdAndUpdate(id, { state: false });
  return questionResponse;
};

module.exports = {
  geTAllQuestionsResponse,
  getOneQuestionResponse,
  createQuestionResponse,
  updateQuestionResponse,
  deleteQuestionResponse,
};
