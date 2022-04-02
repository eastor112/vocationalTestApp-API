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
    total,
    billings,
  };
};

const getOneBilling = async (id) => {
  const billing = await Billing.findById(id)
    .populate('user', 'names email');

  if (!billing || !billing.state) {
    return null;
  }

  return billing;
};

const createBilling = async (newBilling) => {
  const billing = await Billing.create(newBilling);
  return billing;
};

const updateBilling = async (id, newData) => {
  const billing = await Billing.findByIdAndUpdate(id, newData, { new: true })
    .populate('user', 'names email');

  return billing;
};

const deleteBilling = async (id) => {
  const billing = await Billing.findByIdAndUpdate(id, { state: false }, { new: true });
  return billing;
};

module.exports = {
  getAllBillings,
  getOneBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};
