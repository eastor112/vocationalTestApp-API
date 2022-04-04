const User = require('../api/users/users.model');
const Role = require('../commonModels/roles');
const University = require('../api/universities/universities.model');
const Question = require('../api/questions/questions.model');
const VocationalTest = require('../api/vocationalTest/vocationalTest.model');

const isValidRole = async (rol = '') => {
  const role = await Role.findOne({ rol });
  if (!role) {
    throw new Error(`the role ${rol} doesn't exist`);
  }
};

const userExistById = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.state) {
    throw new Error(`the user with id ${id} doesn't exist`);
  }
};

const emailExist = async (email = '') => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`the email ${email} is already registered`);
  }
};
const universityExistById = async (id) => {
  const university = await University.findById(id);
  if (!university || !university.state) {
    throw new Error(`the university with id ${id} doesn't exist`);
  }
};

const questionExistsById = async (id) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new Error(`the question with id ${id} doesn't exist`);
  }
};

const vocationalTestExistsById = async (id) => {
  const vocationalTest = await VocationalTest.findById(id);
  if (!vocationalTest || !vocationalTest.state) {
    throw new Error(`the vocationalTest with id ${id} doesn't exist`);
  }
};

module.exports = {
  isValidRole,
  userExistById,
  emailExist,
  universityExistById,
  questionExistsById,
  vocationalTestExistsById,
};
