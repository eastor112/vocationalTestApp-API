const User = require('../users/users.model');
const Billing = require('./billings.model');

const getAllBillings = async (limit, page) => {
  const query = { state: true };

  const [total, billings] = await Promise.all([
    Billing.countDocuments(query),
    Billing.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email')]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    billings,
  };
};

const getOneBilling = async (id) => {
  const billing = await Billing.findById(id)
    .populate('user', 'names email');

  return billing;
};

const createBilling = async (newBilling) => {
  const user = await User.findOne({ _id: newBilling.user });

  if (user.purchasedTests) {
    const existingTest = user.purchasedTests.find((pt) => pt === newBilling.test);

    if (existingTest) {
      throw new Error('User already purchased this test');
    }
  } else {
    user.purchasedTests = [];
    user.purchasedTests.push(newBilling.test);
    await user.save();
  }

  const billing = await Billing.create(newBilling);

  return billing;
};

const updateBilling = async (id, newData) => {
  const billing = await Billing.findByIdAndUpdate(id, newData, { new: true })
    .populate('user', 'names email');

  return billing;
};

const deleteBilling = async (id) => {
  const billing = await Billing.findByIdAndUpdate(id, { state: false }, { new: true })
    .populate('user', 'names email');
  return billing;
};

module.exports = {
  getAllBillings,
  getOneBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};
