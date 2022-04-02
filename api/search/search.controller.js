const { ObjectId } = require('mongoose').Types;
const User = require('../users/users.model');
const { searchUsers } = require('./search.service');

const handlerUsersSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const user = await User.findById(query);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const { total, users } = await searchUsers(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: users,
  });
};

const handlerUniversitiesSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerUniversitiesSearch' });
};

const handlerCareersSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerCareersSearch' });
};

const handlerQuestionsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerQuestionsSearch' });
};

const handlerTestsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerTestsSearch' });
};

const handlerBillingsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerBillingsSearch' });
};

const handlerOffersSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerOffersSearch' });
};

const handlerResultsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerResultsSearch' });
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
};
