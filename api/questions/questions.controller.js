const {
  getOneQuestion,
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('./questions.service');

const handlerAllQuestions = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    const questions = await getAllQuestions(limit, page);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting questions' });
  }
};

const handlerOneQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await getOneQuestion(id);

    res.json(question);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting question' });
  }
};

const handlerDeleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteQuestion(id);

    return res.status(204).json({ msg: 'Question deleted' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting question' });
  }
};

const handlerCreateQuestion = async (req, res) => {
  const { _id, __v, state, updatedAt, createdAt, ...newQuestion } = req.body;
  try {
    const question = await createQuestion(newQuestion);

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerUpdateQuestion = async (req, res) => {
  const { id } = req.params;
  const { _id, __v, state, updatedAt, createdAt, ...rest } = req.body;

  try {
    const question = await updateQuestion(id, rest);

    res.json(question);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating question' });
  }
};

module.exports = {
  handlerAllQuestions,
  handlerOneQuestion,
  handlerDeleteQuestion,
  handlerCreateQuestion,
  handlerUpdateQuestion,
};
