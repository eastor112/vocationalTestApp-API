const { cleanCloudinary } = require('../../helpers/cloudinaryActions');
const Offers = require('./offers.model');

const getAllOffers = async (limit, page) => {
  const [total, offers] = await Promise.all([
    Offers.countDocuments({ state: true }),
    Offers.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name')
      .populate('career', 'name description')]);

  return {
    totalDocs: total,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    offers,
  };
};

const getOneOffer = async (id) => {
  const offer = await Offers.findById(id)
    .populate('university', 'name')
    .populate('career', 'name description');

  return offer;
};

const createOffer = async (data) => {
  const offer = await Offers.create(data);

  return offer;
};

const updateOffer = async (id, data) => {
  const offerOld = await Offers.findById(id);

  if (data.photo) cleanCloudinary(offerOld.photo, 'offers');

  const offer = await Offers.findByIdAndUpdate(id, data, { new: true })
    .populate('university', 'name')
    .populate('career', 'name description');

  return offer;
};
const deleteOffer = async (id) => {
  const offer = await Offers.findByIdAndUpdate(id, { state: false })
    .populate('university', 'name')
    .populate('career', 'name description');

  return offer;
};

module.exports = {
  getAllOffers,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
