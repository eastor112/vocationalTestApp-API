const TestResults = require('./testResults.model');

const getAllTestResults = async (limit, page) => {
  const [total, testResults] = await Promise.all([
    TestResults.countDocuments({ state: true }),
    TestResults.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email')
      .populate('test', 'type numberOfQuestions'),
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
    .populate('test', '-state -__v');

  return testResult;
};

const createTestResults = async (data) => {
  let testResut = await TestResults.create(data);

  testResut = await testResut.populate('test', '-state -__v');

  return testResut;
};

const updateTestResults = async (id, data) => {
  const testResult = await TestResults.findOneAndUpdate({ _id: id }, data, { new: true })
    .populate('user', 'names email')
    .populate('test', 'type numberOfQuestions');

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

const destroyTestResults = async (id) => {
  const testResult = await TestResults.findById(id);
  await testResult.remove();

  return testResult;
};

module.exports = {
  getAllTestResults,
  getOneTestResults,
  createTestResults,
  updateTestResults,
  deleteTestResults,
  destroyTestResults,
};
