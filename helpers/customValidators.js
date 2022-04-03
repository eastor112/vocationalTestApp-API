const { ObjectId } = require('mongoose').Types;
const User = require('../api/users/users.model');
const Role = require('../commonModels/roles');
const Billing = require('../api/billings/billings.model');
const TestResults = require('../api/testResults/testResults.model');
const Offers = require('../api/offers/offers.model');
const University = require('../api/universities/universities.model');
const Careers = require('../api/careers/careers.model');

const isValidRole = async (rol = '') => {
  const role = await Role.findOne({ rol });
  if (!role) {
    throw new Error(`the role ${rol} dosn't exist`);
  }
};

const userExistById = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.state) {
    throw new Error(`the user with id ${id} doesn't exist`);
  }
};

const emailExist = async (email = '') => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`the email ${email} is alreaddy registered`);
  }
};

const billingExistById = async (id) => {
  const billing = await Billing.findById(id);
  if (!billing || !billing.state) {
    throw new Error(`the billing with id ${id} doesn't exist`);
  }
};

const testResultExistById = async (id) => {
  const testResults = await TestResults.findById(id);
  if (!testResults || !testResults.state) {
    throw new Error(`the testResults with id ${id} doesn't exist`);
  }
};

const offersExistById = async (id) => {
  const offer = await Offers.findById(id);
  if (!offer || !offer.state) {
    throw new Error(`the offer with id ${id} doesn't exist`);
  }
};

const isCareerMongoIdAndExistOrEmpty = async (id) => {
  if (id) {
    if (!ObjectId.isValid(id)) {
      throw new Error(`the id ${id} is not a valid mongoId`);
    }
    // const user = await User.findById(id);
    // if (!user || !user.state) {
    //   throw new Error(`the user with id ${id} doesn't exist`);
    // }
  }
};

const isUniversityMongoIdAndExistOrEmpty = async (id) => {
  if (id) {
    if (!ObjectId.isValid(id)) {
      throw new Error(`the id ${id} is not a valid mongoId`);
    }
    const university = await University.findById(id);

    if (!university) {
      throw new Error(`the university with id ${id} doesn't exist`);
    }
  }
};

const careerExistById = async (id) => {
  const career = await Careers.findById(id);
  if (!career || !career.state) {
    throw new Error(`the career with id ${id} doesn't exist`);
  }
};

module.exports = {
  isValidRole,
  userExistById,
  billingExistById,
  emailExist,
  testResultExistById,
  offersExistById,
  isCareerMongoIdAndExistOrEmpty,
  isUniversityMongoIdAndExistOrEmpty,
  careerExistById,
};
