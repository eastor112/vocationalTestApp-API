const { isObjectIdOrHexString } = require('mongoose');
const {
  searchUsers,
  searchUniversities,
  searchBilling,
  searchResults,
  searchCareers,
  searchOffers,
  searchQuestionResponse,
  searchTest,
  searchQuestions,
} = require('./search.service');

const handlerUsersSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  try {
    const users = await searchUsers(query, limit, page);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerUniversitiesSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  try {
    const universities = await searchUniversities(query, limit, page);

    return res.json(universities);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerCareersSearch = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { query } = req.params;

  try {
    const careers = await searchCareers(query, limit, page);

    return res.json(careers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerOffersSearch = async (req, res) => {
  const { limit = 5, page = 1, target } = req.query;
  const { query } = req.params;

  try {
    const offers = await searchOffers(query, limit, page, target);

    return res.json(offers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerBillingsSearch = async (req, res) => {
  const { limit = 5, page = 1, target } = req.query;
  const { query } = req.params;

  try {
    const results = await searchBilling(query, target, limit, page);

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerResultsSearch = async (req, res) => {
  const { limit = 5, page = 1, target } = req.query;
  const { query } = req.params;

  try {
    const results = await searchResults(query, target, limit, page);

    return res.json(results);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const handlerQuestionsSearch = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { query } = req.params;
  try {
    const questions = await searchQuestions(query, limit, page);
    return res.json(questions);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerTestsSearch = async (req, res) => {
  const { query } = req.params;
  try {
    const test = await searchTest(query);
    return res.json(test);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerQuestionResponseSearch = async (req, res) => {
  const { query } = req.params;
  try {
    const questionResponse = await searchQuestionResponse(query);
    return res.json(questionResponse);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  handlerUsersSearch,
  handlerUniversitiesSearch,
  handlerCareersSearch,
  handlerQuestionsSearch,
  handlerTestsSearch,
  handlerBillingsSearch,
  handlerOffersSearch,
  handlerResultsSearch,
  handlerQuestionResponseSearch,
};
