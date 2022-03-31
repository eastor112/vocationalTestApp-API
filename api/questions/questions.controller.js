const {
  getOneQuestion,
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('./questions.service');

const handlerAllQuestions = async (req, res) => {
  const questions = await getAllQuestions();
  res.json(questions);
};

const handlerOneQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await getOneQuestion(id);
  res.json(question);
};

const handlerDeleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await getOneQuestion(id);
  deleteQuestion(id);
  res.json({ msg: 'Question deleted' });
};

const handlerCreateQuestion = async (req, res) => {
  const newQuestion = await createQuestion(req.body);
  return res.status(201).json(newQuestion);
};

const handlerUpdateQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await updateQuestion(id, req.body);
  res.json(question);
};

module.exports = {
  handlerAllQuestions,
  handlerOneQuestion,
  handlerDeleteQuestion,
  handlerCreateQuestion,
  handlerUpdateQuestion,
};
