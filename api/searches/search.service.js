const { ObjectId } = require('mongoose').Types;
const User = require('../users/users.model');
const University = require('../universities/universities.model');
const Billing = require('../billings/billings.model');
const TestResults = require('../testResults/testResults.model');
const Careers = require('../careers/careers.model');
const Offers = require('../offers/offers.model');

const searchUsers = async (query, limit, page) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const userById = await User.findOne({ _id: query, state: true })
      .populate('university', 'name');
    if (userById) {
      return {
        totalDocs: 1,
        currentPage: 1,
        totalPages: 1,
        results: [userById],
      };
    }

    const userByUniversityId = await User.findOne({ university: { _id: query }, state: true })
      .populate('university', 'name');
    if (userByUniversityId) {
      return {
        totalDocs: 1,
        currentPage: 1,
        totalPages: 1,
        results: [userByUniversityId],
      };
    }

    return {
      totalDocs: 0,
      currentPage: 1,
      totalPages: 1,
      results: [],
    };
  }

  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { names: queryRegex },
      { email: queryRegex },
      { username: queryRegex },
      { fatherName: queryRegex },
      { motherName: queryRegex },
      { role: queryRegex },
      { 'address.country': queryRegex },
      { 'address.city': queryRegex }],
    $and: [{ state: true }],
  };

  const [total, users] = await Promise.all([
    User.countDocuments(criteria),
    User.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: users,
  };
};

const searchUniversities = async (query, limit, page) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const university = await University.findOne({ _id: query, state: true });

    return {
      totalDocs: university ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: university ? [university] : [],
    };
  }

  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { name: queryRegex },
      { 'address.city': queryRegex },
      { 'address.Country': queryRegex },
      { 'offer.name': queryRegex }],
    $and: [{ state: true }],
  };

  const [total, universities] = await Promise.all([
    University.countDocuments(criteria),
    University.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('offer', 'name'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: universities,
  };
};

const searchCareers = async (query, limit, page) => {
  if (ObjectId.isValid(query)) {
    const career = await Careers.findOne({ _id: query, state: true });
    return {
      totalDocs: career ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: career ? [career] : [],
    };
  }

  const queryRegex = new RegExp(query, 'i');
  const criteria = ({ name: queryRegex, estate: true });

  const [total, careers] = await Promise.all([
    await Careers.countDocuments(criteria),
    await Careers.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1)),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: careers,
  };
};

const searchOffers = async (query, limit, page, target) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    if (!target) {
      const offer = await Offers.findOne({ _id: query, state: true })
        .populate('university', 'name')
        .populate('career', 'name');

      return {
        totalDocs: offer ? 1 : 0,
        currentPage: 1,
        totalPages: 1,
        results: offer ? [offer] : [],
      };
    }

    if (target === 'university') {
      const [total, offers] = await Promise.all([
        await Offers.countDocuments({ university: { _id: query }, state: true }),
        await Offers.find({ university: { _id: query }, state: true })
          .limit(limit)
          .skip(limit * (page - 1))
          .populate('university', 'name')
          .populate('career', 'name'),
      ]);

      return {
        totalDocs: total,
        currentPage: 1,
        totalPages: Math.ceil(total / limit),
        results: offers,
      };
    }

    if (target === 'career') {
      if (ObjectId.isValid(query)) {
        const [total, offers] = await Promise.all([
          await Offers.countDocuments({ career: { _id: query }, state: true }),
          Offers.find({ career: { _id: query, state: true } })
            .populate('university', 'name')
            .populate('career', 'name'),
        ]);

        return {
          totalDocs: total,
          currentPage: 1,
          totalPages: 1,
          results: offers,
        };
      }
    }
  }

  const queryRegex = new RegExp(query, 'i');

  const criteria = ({ name: queryRegex, state: true });

  const [total, offers] = await Promise.all([
    await Offers.countDocuments(criteria),
    await Offers.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name')
      .populate('career', 'name'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: offers,
  };
};

const searchBilling = async (query, target, limit, page) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    if (!target) {
      const billing = await Billing.findOne({ _id: query, state: true })
        .populate('user', 'names email');

      return {
        totalDocs: billing ? 1 : 0,
        currentPage: 1,
        totalPages: 1,
        results: billing ? [billing] : [],
      };
    }

    if (target === 'user') {
      const [total, billing] = await Promise.all([
        await Billing.countDocuments({ user: { _id: query }, state: true }),
        await Billing.find({ user: { _id: query }, state: true })
          .limit(limit)
          .skip(limit * (page - 1))
          .populate('user', 'names email'),
      ]);

      return {
        totalDocs: total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        results: billing,
      };
    }
  }

  if (!Number.isNaN(Number(query))) {
    const billing = await Billing.findOne({ transactionNumber: Number(query), state: true })
      .populate('user', 'names email');

    return {
      totalDocs: billing ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: billing ? [billing] : [],
    };
  }

  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { paymentMethod: queryRegex },
      { condition: queryRegex }],
    $and: [{ state: true }],
  };

  const [total, billings] = await Promise.all([
    await Billing.countDocuments(criteria),
    await Billing.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: billings,
  };
};

const searchResults = async (query, target, limit, page) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    let results;
    let total;

    switch (target) {
      case undefined:
        results = await TestResults.findOne({ _id: query, state: true })
          .populate('user', 'names email')
          .populate('careers', 'name');

        return {
          totalDocs: results ? 1 : 0,
          currentPage: 1,
          totalPages: 1,
          results: results ? [results] : [],
        };

      case 'user':

        [total, results] = await Promise.all([
          await TestResults.countDocuments({ user: { _id: query }, state: true }),
          await TestResults.find({ user: { _id: query }, state: true })
            .populate('user', 'names email')
            .populate('careers', 'name')
            .populate('test', 'title'),
        ]);

        return {
          totalDocs: total,
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          results,
        };

      case 'test':
        [total, results] = await Promise.all([
          await TestResults.countDocuments({ test: { _id: query }, state: true }),
          await TestResults.find({ test: { _id: query }, state: true })
            .populate('user', 'names email')
            .populate('careers', 'name')
            .populate('test', 'title'),
        ]);

        return {
          totalDocs: total,
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          results,
        };

      case 'careers':
        [total, results] = await Promise.all([
          await TestResults.countDocuments({ careers: { _id: query }, state: true }),
          await TestResults.find({ careers: { _id: query }, state: true })
            .populate('user', 'names email')
            .populate('careers', 'name')
            .populate('test', 'title'),
        ]);

        return {
          totalDocs: total,
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          results,
        };

      case 'question':
        [total, results] = await Promise.all([
          await TestResults.countDocuments({ questionResponse: { _id: query }, state: true }),
          await TestResults.find({ questionResponse: { _id: query }, state: true })
            .populate('user', 'names email')
            .populate('careers', 'name')
            .populate('test', 'title'),
        ]);

        return {
          totalDocs: total,
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          results,
        };

      default:
        throw new Error('Target is not in [user, test, careers, question]');
    }
  }

  throw new Error(`${query} is not a valid MongoId`);
};

module.exports = {
  searchUsers,
  searchUniversities,
  searchBilling,
  searchResults,
  searchCareers,
  searchOffers,
};
