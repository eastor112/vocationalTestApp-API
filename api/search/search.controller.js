const { ObjectId } = require('mongoose').Types;
const Billing = require('../billings/billings.model');

const {
  searchUsers,
  searchUniversities,
  searchBilling,
  searchResults,
  searchCareers,
  searchOffers,
} = require('./search.service');

const handlerUsersSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const users = await searchUsers(query, limit, page);

  return res.json(users);
};

const handlerUniversitiesSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const universities = await searchUniversities(query, limit, page);

  return res.json(universities);
};

const handlerCareersSearch = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { query } = req.params;

  const careers = await searchCareers(query, limit, page);

  return res.json(careers);
};

const handlerOffersSearch = async (req, res) => {
  const { limit = 5, page = 1, target } = req.query;
  const { query } = req.params;

  const offers = await searchOffers(query, limit, page, target);

  return res.json(offers);
};

const handlerResultsSearch = async (req, res) => {
  const { limit = 5, page = 1, target } = req.query;
  const { query } = req.params;
  try {
    const results = await searchResults(query, target, limit, page);

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerBillingsSearch = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { query } = req.params;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    let billing = await Billing.findById(query)
      .populate('user', 'names email');

    if (billing) {
      return res.json({
        totalDocs: 1,
        currentPage: 1,
        totalPages: 1,
        results: [billing],
      });
    }

    const total = await Billing.countDocuments({ user: { _id: query } });
    billing = await Billing.find({ user: { _id: query } })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email');

    return res.json({
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: billing,
    });
  }

  if (!Number.isNaN(Number(query))) {
    const billing = await Billing.find({ transactionNumber: Number(query) })
      .populate('user', 'names email');
    return res.json({
      totalDocs: billing ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: billing,
    });
  }

  const { total, billings } = await searchBilling(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: billings,
  });
};

const handlerQuestionsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerQuestionsSearch' });
};

const handlerTestsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerTestsSearch' });
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
