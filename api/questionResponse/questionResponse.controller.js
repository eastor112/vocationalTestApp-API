const QuestionResponse = require('./questionResponse.model');
const { geTAllQuestionsResponse, getOneQuestionResponse, createQuestionResponse, updateQuestionResponse, deleteQuestionResponse, createQuestionResponseMultiple } = require('./questionResponse.service');

const handlerGeTAllQuestionsResponse = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const questionResponses = await geTAllQuestionsResponse(limit, page);
    res.json(questionResponses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const handlerGetOneQuestionResponse = async (req, res) => {
  const { id } = req.params;
  try {
    const questionResponse = await getOneQuestionResponse(id);
    if (!questionResponse.state) {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    return res.json(questionResponse);
  } catch (error) {
    return res.status(500).json({ msg: 'Error in the server' });
  }
};

const handlerCreateQuestionResponse = async (req, res) => {
  const { _id, createdAt, updatedAt, state, ...rest } = req.body;
  try {
    const questionResponse = await createQuestionResponse(rest);
    res.json(questionResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const handlerCreateQuestionResponseMultiple = async (req, res) => {
  const questionResponses = req.body;

  try {
    const docs = await createQuestionResponseMultiple(questionResponses);

    return res.json(docs);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerUpdateQuestionResponse = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, updatedAt, state, ...rest } = req.body;
  try {
    const questionResponse = await updateQuestionResponse(id, rest);
    res.json(questionResponse);
  } catch (error) {
    res.status(500).json({ msg: 'Error in the server' });
  }
};

const handlerDeleteQuestionResponse = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteQuestionResponse(id);
    return res.json({ msg: `Answer deleted with id ${id}` });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting answer' });
  }
};

module.exports = {
  handlerGeTAllQuestionsResponse,
  handlerGetOneQuestionResponse,
  handlerCreateQuestionResponse,
  handlerCreateQuestionResponseMultiple,
  handlerUpdateQuestionResponse,
  handlerDeleteQuestionResponse,
};
