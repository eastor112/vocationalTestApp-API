const { ObjectId } = require('mongoose').Types;
const User = require('../api/users/users.model');
const Role = require('../commonModels/roles');
const Billing = require('../api/billings/billings.model');
const TestResults = require('../api/testResults/testResults.model');
const Offers = require('../api/offers/offers.model');
const University = require('../api/universities/universities.model');
const Careers = require('../api/careers/careers.model');
const Question = require('../api/questions/questions.model');
const VocationalTest = require('../api/vocationalTest/vocationalTest.model');
const PaymentMethod = require('../commonModels/paymentsMethods');

const isValidRole = async (rol = '') => {
  const role = await Role.findOne({ rol });
  if (!role) {
    throw new Error(`the role ${rol} doesn't exist`);
  }
};

const isValidRoleOrEmpty = async (rol) => {
  if (rol) {
    const role = await Role.findOne({ rol });
    if (!role) {
      throw new Error(`the role ${rol} doesn't exist`);
    }
  }
};

const isValidPaymentMethodAndExist = async (method) => {
  if (!method) {
    throw new Error('the payment method is required');
  }
  const paymentMethod = await PaymentMethod.findOne({ name: method });

  if (!paymentMethod) {
    throw new Error(`the payment method ${method} doesn't exist`);
  }
};

const userExistById = async (id) => {
  const user = await User.findOne({ _id: id, state: true });
  if (!user) {
    throw new Error(`the user with id ${id} doesn't exist`);
  }
};

const emailExist = async (email = '') => {
  const user = await User.findOne({ email, state: true });
  if (user) {
    throw new Error(`the email ${email} is already registered`);
  }
};

const universityExistById = async (id) => {
  const university = await University.findOne({ _id: id, state: true });
  if (!university) {
    throw new Error(`the university with id ${id} doesn't exist`);
  }
};

const questionExistsById = async (id) => {
  const question = await Question.findOne({ _id: id, state: true });
  if (!question) {
    throw new Error(`the question with id ${id} doesn't exist`);
  }
};

const vocationalTestExistsById = async (id) => {
  const vocationalTest = await VocationalTest.findOne({ _id: id, state: true });
  if (!vocationalTest) {
    throw new Error(`the vocationalTest with id ${id} doesn't exist`);
  }
};

const billingExistById = async (id) => {
  const billing = await Billing.findOne({ _id: id, state: true });
  if (!billing) {
    throw new Error(`the billing with id ${id} doesn't exist`);
  }
};

const testResultExistById = async (id) => {
  const testResults = await TestResults.findOne({ _id: id, state: true });
  if (!testResults) {
    throw new Error(`the testResults with id ${id} doesn't exist`);
  }
};

const offersExistById = async (id) => {
  const offer = await Offers.findOne({ _id: id, state: true });
  if (!offer) {
    throw new Error(`the offer with id ${id} doesn't exist`);
  }
};

const isCareerMongoIdAndExistOrEmpty = async (id) => {
  if (id) {
    if (!ObjectId.isValid(id)) {
      throw new Error(`the id ${id} is not a valid mongoId`);
    }
    const career = await Careers.findById(id);

    if (!career || !career.state) {
      throw new Error(`the career with id ${id} doesn't exist`);
    }
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
  const career = await Careers.findOne({ _id: id, state: true });
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
  universityExistById,
  questionExistsById,
  vocationalTestExistsById,
  isValidRoleOrEmpty,
  isValidPaymentMethodAndExist,
};
