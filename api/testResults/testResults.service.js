const TestResults = require('./testResults.model');

const getAllTestResults = async (limit, page) => {
  const total = await TestResults.countDocuments({ state: true });
  const testResults = await TestResults.find({ state: true })
    .limit(limit)
    .skip(limit * (page - 1))
    .populate('user', 'names email');

  return {
    total,
    testResults,
  };
};

const getOneTestResults = async (id) => {
  const testResult = await TestResults.findOne({ _id: id, state: true })
    .populate('user', 'names email');

  return testResult;
};

const createTestResults = async (data) => {
  const testResut = await TestResults.create(data);

  return testResut;
};

const updateTestResults = async (id, data) => {
  const testResult = await TestResults.findOneAndUpdate({ _id: id }, data, { new: true });

  return testResult;
};

const deleteTestResults = async (id) => {
  const testResult = await TestResults.findOneAndUpdate(
    { _id: id },
    { state: false },
    { new: true },
  );
  return testResult;
};

module.exports = {
  getAllTestResults,
  getOneTestResults,
  createTestResults,
  updateTestResults,
  deleteTestResults,
};
