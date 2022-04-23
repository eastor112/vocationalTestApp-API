const TestResults = require('./testResults.model');

const getAllTestResults = async (limit, page) => {
  const [total, testResults] = await Promise.all([
    TestResults.countDocuments({ state: true }),
    TestResults.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email')
      .populate('test', 'name description'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    testResults,
  };
};

const getOneTestResults = async (id) => {
  const testResult = await TestResults.findById(id)
    .populate('user', 'names email')
    .populate('test', 'name description');

  return testResult;
};

const createTestResults = async (data) => {
  const testResut = await TestResults.create(data);

  return testResut;
};

const updateTestResults = async (id, data) => {
  const testResult = await TestResults.findOneAndUpdate({ _id: id }, data, { new: true })
    .populate('user', 'names email')
    .populate('test', 'name description');

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
