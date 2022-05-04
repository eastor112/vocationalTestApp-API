const { cleanCloudinary } = require('../../helpers/cloudinaryActions');
const Careers = require('../careers/careers.model');
const University = require('../universities/universities.model');
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
  const dataCopy = { ...data };

  const career = await Careers.findOne({ name: data.career });

  if (career) {
    dataCopy.career = career._id;
  } else {
    delete dataCopy.career;
  }

  let offer = await Offers.create(dataCopy);
  offer = await offer.populate('career', 'name');

  await University.findByIdAndUpdate(offer.university, { $push: { offer: offer._id } });

  return offer;
};

const updateOffer = async (id, data) => {
  const dataCopy = { ...data };

  const offerOld = await Offers.findById(id);
  if (data.photo) cleanCloudinary(offerOld.photo, 'offers');

  const career = await Careers.findOne({ name: data.career });
  if (career) {
    dataCopy.career = career._id;
  } else {
    delete dataCopy.career;
  }

  const offer = await Offers.findByIdAndUpdate(id, dataCopy, { new: true })
    .populate('university', 'name')
    .populate('career', 'name description');

  return offer;
};

const deleteOffer = async (id) => {
  const offer = await Offers.findByIdAndUpdate(id, { state: false });

  return offer;
};

const destroyOffer = async (id) => {
  const offer = await Offers.findByIdAndDelete(id);

  const universityId = offer.university.toString();
  const university = await University.findById(universityId);

  const restOffers = university.offer.filter(
    (offerId) => offerId.toString() !== offer._id.toString(),
  );

  university.offer = restOffers;

  await university.save();

  return offer;
};

module.exports = {
  getAllOffers,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  destroyOffer,
};
