const Careers = require('./careers.model');
const { cleanCloudinary } = require('../../helpers/cloudinaryActions');
const CareersNames = require('../../commonModels/careersNames');

const getAllCareers = async (limit, page) => {
  const [total, careers] = await Promise.all([
    Careers.countDocuments({ state: true }),
    Careers.find({ state: true })
      .limit(limit)
      .skip((page - 1) * limit),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    careers,
  };
};

const getOneCareer = async (id) => {
  const career = await Careers.findById(id);
  return career;
};

const createCareer = async (rest) => {
  const career = await Careers.create(rest);
  await CareersNames.create({ name: career.name });

  return career;
};

const updateCareer = async (id, rest) => {
  const careerOld = await Careers.findById(id);

  if (rest.photo) cleanCloudinary(careerOld.photo, 'careers');

  const career = await Careers.findByIdAndUpdate(id, rest, { new: true });
  await CareersNames.findOneAndUpdate({ name: careerOld.name }, { name: career.name });

  return career;
};

const deleteCareer = async (id) => {
  const career = await Careers.findByIdAndUpdate(id, { state: false }, { new: true });
  return career;
};

module.exports = {
  getAllCareers,
  getOneCareer,
  createCareer,
  updateCareer,
  deleteCareer,
};
