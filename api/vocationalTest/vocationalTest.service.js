const VocationalTest = require('./vocationalTest.model');

const getAllTests = async (limit, page) => {
  const [total, tests] = await Promise.all([
    VocationalTest.countDocuments({ state: true }),
    VocationalTest.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1)),
  ]);

  return {
    countDocs: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    tests,
  };
};

const getOneTest = async (id) => {
  const test = await VocationalTest.findOne({ _id: id, state: true });
  return test;
};

const createTest = async (rest) => {
  const test = await VocationalTest.create(rest);
  return test;
};

const updateTest = async (id, rest) => {
  const test = await VocationalTest.findOneAndUpdate(
    { _id: id, state: true },
    rest,
    { new: true },
  );

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
