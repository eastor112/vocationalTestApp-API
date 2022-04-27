const {
  getAllBillings,
  getOneBilling,
  createBilling,
  updateBilling,
  deleteBilling,
} = require('./billings.service');

const handlerGetAllBillings = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  const billings = await getAllBillings(limit, page);

  res.json(billings);
};

const handlerGetOneBilling = async (req, res) => {
  const { id } = req.params;

  const billing = await getOneBilling(id);

  if (!billing) {
    return res.status(404).json({ msg: `Billing not found with id: ${id}  ` });
  }

  return res.json(billing);
};

const handlerCreateBilling = async (req, res) => {
  const { _id, state, __v, updatedAt, createdAt, transactionNumber, ...rest } = req.body;

  const existingTest = req.user.purchasedTests.find((pt) => pt.toString() === rest.testId);

  if (existingTest) {
    return res.status(400).json({ msg: 'User already purchased this test' });
  }
  req.user.purchasedTests = [...req.user.purchasedTests, rest.testId];

  await req.user.save();

  try {
    const billing = await createBilling(rest);

    return res.status(201).json(billing);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const handlerUpdateBilling = async (req, res) => {
  const { id } = req.params;
  const { _id, state, __v, createdAt, transactionNumber, ...rest } = req.body;

  try {
    const billing = await updateBilling(id, rest);
    res.json(billing);
  } catch (error) {
    res.status(500).json(error);
  }
};

const handlerDeleteBilling = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteBilling(id);
    return res.status(204).json({ msg: `Billing with id: ${id} was deleted` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  handlerGetAllBillings,
  handlerGetOneBilling,
  handlerCreateBilling,
  handlerUpdateBilling,
  handlerDeleteBilling,
};
