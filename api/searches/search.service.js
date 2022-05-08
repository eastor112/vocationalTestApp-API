const { ObjectId } = require('mongoose').Types;
const User = require('../users/users.model');
const University = require('../universities/universities.model');
const Billing = require('../billings/billings.model');
const TestResults = require('../testResults/testResults.model');
const Careers = require('../careers/careers.model');
const Offers = require('../offers/offers.model');
const QuestionResponse = require('../questionResponse/questionResponse.model');
const Tests = require('../vocationalTest/vocationalTest.model');
const Questions = require('../questions/questions.model');
const Offer = require('../offers/offers.model');

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
      { phone: queryRegex },
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

const searchUniversities = async (
  name,
  country,
  career,
  limit,
  page,
) => {
  const nameRegex = new RegExp(name, 'i');
  const careerRegex = new RegExp(career, 'i');
  const countryRegex = new RegExp(country, 'i');

  if (country === '' && career === '' && name !== '') {
    // only name
    const [total, universities] = await Promise.all([
      University.countDocuments({ name: nameRegex, state: true }),
      University.find({ name: nameRegex, state: true })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country === '' && career !== '' && name === '') {
    // only career
    const offers = await Offer.find({ name: careerRegex, state: true }, 'university');

    const criteria = {
      _id: { $in: offers.map((offer) => offer.university) },
      state: true,
    };

    const [total, universities] = await Promise.all([
      University.countDocuments(criteria),
      University.find(criteria)
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country !== '' && career === '' && name === '') {
    // only country
    const [total, universities] = await Promise.all([
      await University.countDocuments({ 'address.country': countryRegex, state: true }),
      await University.find({ 'address.country': countryRegex, state: true })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country === '' && career !== '' && name !== '') {
    // only name and career
    const offers = await Offer.find({ name: careerRegex, state: true }, 'university');

    const criteria = {
      _id: { $in: offers.map((offer) => offer.university) },
      name: nameRegex,
      state: true,
    };

    const [total, universities] = await Promise.all([
      University.countDocuments(criteria),
      University.find(criteria)
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country !== '' && career !== '' && name === '') {
    // only country and career
    const offers = await Offer.find({ name: careerRegex, state: true }, 'university');

    const criteria = {
      _id: { $in: offers.map((offer) => offer.university) },
      'address.country': countryRegex,
      state: true,
    };

    const [total, universities] = await Promise.all([
      University.countDocuments(criteria),
      University.find(criteria)
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country !== '' && career === '' && name !== '') {
    // only country and name

    const criteria = {
      name: nameRegex,
      'address.country': countryRegex,
      state: true,
    };

    const [total, universities] = await Promise.all([
      await University.countDocuments(criteria),
      await University.find(criteria)
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country !== '' && career !== '' && name !== '') {
    // all
    const offers = await Offer.find({ name: careerRegex, state: true }, 'university');

    const criteria = {
      _id: { $in: offers.map((offer) => offer.university) },
      name: nameRegex,
      'address.country': countryRegex,
      state: true,
    };

    const [total, universities] = await Promise.all([
      University.countDocuments(criteria),
      University.find(criteria)
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  } if (country === '' && career === '' && name === '') {
    // all
    const [total, universities] = await Promise.all([
      University.countDocuments({ state: true }),
      University.find({ state: true })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('offer', 'name')
        .sort({ 'ranking.national': 1 }),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: universities,
    };
  }

  return {
    totalDocs: 0,
    currentPage: 0,
    totalPages: 0,
    results: [],
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
          .populate('test', 'title');

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
            .populate('test', '-state -__v'),
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
            .populate('test', 'title'),
        ]);

        return {
          totalDocs: total,
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          results,
        };

      default:
        throw new Error('Target is not in [user, test]');
    }
  }

  throw new Error(`${query} is not a valid MongoId`);
};

const searchQuestionResponse = async (query, target, limit, page) => {
  if (ObjectId.isValid(query)) {
    const questionResponse = await QuestionResponse.findById({ _id: query, state: true });
    return {
      totalDocs: questionResponse ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: questionResponse ? [questionResponse] : [],
    };
  }
  return 'Invalid Id';
};

const searchTest = async (query, target, limit, page) => {
  if (ObjectId.isValid(query)) {
    const test = await Tests.findOne({ _id: query, state: true });
    return {
      totalDocs: test ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: test ? [test] : [],
    };
  }
  const queryRegex = new RegExp(query, 'i');
  const criteria = ({ title: queryRegex, state: true });
  const [total, tests] = await Promise.all([
    await Tests.countDocuments(criteria),
    await Tests.find(criteria).limit(limit).skip(limit * (page - 1)),
  ]);
  return {
    totalDocs: total,
    currentPage: 1,
    totalPages: Math.ceil(total / 5),
    results: tests,
  };
};

const searchQuestions = async (query, target, limit, page) => {
  if (ObjectId.isValid(query)) {
    const question = await Questions.findOne({ _id: query, state: true })
      .populate('test', 'title');

    if (question) {
      return {
        totalDocs: question ? 1 : 0,
        currentPage: 1,
        totalPages: 1,
        results: question ? [question] : [],
      };
    }

    const [total, questions] = await Promise.all([
      await Questions.countDocuments({ test: { _id: query }, state: true }),
      await Questions.find({ test: { _id: query }, state: true })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('test', 'title'),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: questions,
    };
  }

  const queryRegex = new RegExp(query, 'i');

  if (target === 'type') {
    const [total, questions] = await Promise.all([
      Questions.countDocuments({ type: queryRegex, state: true }),
      Questions.find({ type: queryRegex, state: true })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate('test', 'title'),
    ]);

    return {
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: questions,
    };
  }

  const criteria = {
    $or: [
      { statement: queryRegex },
      { optionA: queryRegex },
      { optionB: queryRegex },
      { optionC: queryRegex },
      { optionD: queryRegex }],
    $and: [{ state: true }],
  };

  const [total, questions] = await Promise.all([
    Questions.countDocuments(criteria),
    Questions.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('test', 'title'),
  ]);

  return {
    totalDocs: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    results: questions,
  };
};

module.exports = {
  searchUsers,
  searchUniversities,
  searchBilling,
  searchResults,
  searchCareers,
  searchOffers,
  searchQuestionResponse,
  searchTest,
  searchQuestions,
};
