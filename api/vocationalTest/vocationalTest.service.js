const VocationalTest = require('./vocationalTest.model');

const getAllTests = async () => {
  const tests = await VocationalTest.find({ state: true });
  return tests;
};
const getOneTest = async (id) => {
  const test = await VocationalTest.findById(id);
  return test;
};

const createTest = async (rest) => {
  const test = await VocationalTest.create(rest);
  return test;
};
const updateTest = async (id, rest) => {
  const test = await VocationalTest.findByIdAndUpdate(id, rest, { new: true });
  return test;
};
const deleteTest = async (id) => {
  const test = await VocationalTest.findByIdAndUpdate(id, { state: false });
  return test;
};

module.exports = {
  getAllTests,
  getOneTest,
  createTest,
  updateTest,
  deleteTest,
};
