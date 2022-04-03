const Offers = require('./offers.model');

const getAllOffers = async (limit, page) => {
  const [total, offers] = await Promise.all([
    await Offers.countDocuments({ state: true }),
    await Offers.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name')]);

  return { total, offers };
};

const getOneOffer = async (id) => {
  const offer = await Offers.findById(id).populate('university', 'name');

  return offer;
};

const createOffer = async (data) => {
  const offer = await Offers.create(data);

  return offer;
};

const updateOffer = async (id, data) => {
  const offer = await Offers.findByIdAndUpdate(id, data, { new: true });

  return offer;
};
const deleteOffer = async (id) => {
  const offer = await Offers.findByIdAndUpdate(id, { state: false });

  return offer;
};

module.exports = {
  getAllOffers,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
