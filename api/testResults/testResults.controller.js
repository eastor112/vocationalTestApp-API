const { getAllTestResults, getOneTestResults, createTestResults, updateTestResults, deleteTestResults } = require('./testResults.service');

const handlerGetAllTestResults = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  try {
    const testResults = await getAllTestResults(limit, page);

    return res.json(testResults);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error getting TestResults',
    });
  }
};

const handlerGetOneTestResults = async (req, res) => {
  const { id } = req.params;
  try {
    const testResult = await getOneTestResults(id);

    if (!testResult) {
      return res.status(404).json({
        msg: 'TestResults not found',
      });
    }

    return res.json(testResult);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error getting TestResult',
    });
  }
};

const handlerCreateTestResults = async (req, res) => {
  const { _id, __v, state, createdAt, updatedAt, ...rest } = req.body;

  try {
    const testResult = await createTestResults(rest);

    return res.status(201).json(testResult);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error creating TestResult',
    });
  }
};

const handlerUpdateTestResults = async (req, res) => {
  const { id } = req.params;
  const { _id, __v, state, createdAt, updatedAt, ...rest } = req.body;

  try {
    const testResult = await updateTestResults(id, rest);

    return res.json(testResult);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error updating TestResult',
    });
  }
};

const handlerDeleteTestResults = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteTestResults(id);

    return res.status(204).json({ msg: `TestResult with id: ${id} was deleted ` });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error deleting TestResult',
    });
  }
};

module.exports = {
  handlerGetAllTestResults,
  handlerGetOneTestResults,
  handlerCreateTestResults,
  handlerUpdateTestResults,
  handlerDeleteTestResults,
};
