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
  if (!question) {
    res.status(404).json({ message: 'Question not found' });
  } else {
    res.json(question);
  }
};

const handlerDeleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await getOneQuestion(id);
  if (!question) {
    res.status(404).json({ message: 'Question not found' });
  } else {
    await deleteQuestion(id);
    res.json({ msg: 'Question deleted' });
  }
};

const handlerCreateQuestion = async (req, res) => {
  const {
    idTest,
    type,
    statement,
    optionA,
    optionB,
    optionC,
    optionD,

  } = req.body;

  if (!idTest) {
    return res.status(400).json({ msg: 'idTest is required' });
  }
  if (!type) {
    return res.status(400).json({ msg: 'type is required' });
  }
  if (!statement) {
    return res.status(400).json({ msg: 'statement is required' });
  }
  if (!optionA) {
    return res.status(400).json({ msg: 'optionA is required' });
  }
  if (!optionB) {
    return res.status(400).json({ msg: 'optionB is required' });
  }
  if (!optionC) {
    return res.status(400).json({ msg: 'optionC is required' });
  }
  if (!optionD) {
    return res.status(400).json({ msg: 'optionD is required' });
  }

  const newQuestion = await createQuestion(req.body);
  return res.status(201).json(newQuestion);
};
