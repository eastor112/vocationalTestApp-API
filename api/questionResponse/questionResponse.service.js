const QuestionResponse = require('./questionResponse.model');

const geTAllQuestionsResponse = async (limit, page) => {
  const [total, questionResponse] = await Promise.all([
    QuestionResponse.countDocuments({ state: true }),
    QuestionResponse.find({ state: true })
      .limit(limit)
      .skip((page - 1) * limit),
  ]);
  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    questionResponse,
  };
};

const getOneQuestionResponse = async (id) => {
  const questionResponse = await QuestionResponse.findById(id);
  return questionResponse;
};

const createQuestionResponse = async (rest) => {
  const questionResponse = await QuestionResponse.create(rest);
  return questionResponse;
};

const createQuestionResponseMultiple = async (rest) => {

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
  createQuestionResponseMultiple,
  updateQuestionResponse,
  deleteQuestionResponse,
};
