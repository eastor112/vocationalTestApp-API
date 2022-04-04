const {
  getAllBillings,
  getOneBilling,
  createBilling,
  updateBilling,
  deleteBilling,
} = require('./billings.service');

const handlerGetAllBillings = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  const { total, billings } = await getAllBillings(limit, page);

  res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    billings,
  });
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
  const newBilling = req.body;

  try {
    const billing = await createBilling(newBilling);
    res.status(201).json(billing);
  } catch (error) {
    res.status(500).json(error);
  }
};

const handlerUpdateBilling = async (req, res) => {
  const { id } = req.params;
  const { _id, state, transactionNumber, ...rest } = req.body;

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
    return res.json({ msg: `Billing with id: ${id} was deleted` });
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
