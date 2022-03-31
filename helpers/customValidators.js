const University = require('../api/universities/universities.model');
const Question = require('../api/questions/questions.model');

const universityExistById = async (id) => {
  const university = await University.findById(id);
  if (!university) {
    throw new Error(`the university with id ${id} doesn't exist`);
  }
};

const questionExistsById = async (id) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new Error(`the question with id ${id} doesn't exist`);
  }
};

module.exports = {
  universityExistById,
  questionExistsById,
};
