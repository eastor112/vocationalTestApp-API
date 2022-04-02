const { ObjectId } = require('mongoose').Types;
const University = require('../universities/universities.model');
const User = require('../users/users.model');
const {
  searchUsers,
  searchUniversities,
} = require('./search.service');

const handlerUsersSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const user = await User.findById(query).populate('university', 'name');
    return res.json({
      totalDocs: 1,
      currentPage: 1,
      totalPages: 1,
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
  const { limit = 5, page = 1 } = req.query;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const university = await University.findById(query);
    return res.json({
      totalDocs: 1,
      currentPage: 1,
      totalPages: 1,
      results: university ? [university] : [],
    });
  }

  const { total, universities } = await searchUniversities(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: universities,
  });
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
