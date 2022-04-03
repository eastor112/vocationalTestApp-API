const User = require('../api/users/users.model');
const Role = require('../commonModels/roles');
const Billing = require('../api/billings/billings.model');
const TestResults = require('../api/testResults/testResults.model');

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

module.exports = {
  isValidRole,
  userExistById,
  billingExistById,
  emailExist,
  testResultExistById,
};
