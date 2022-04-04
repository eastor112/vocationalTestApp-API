const Careers = require('./careers.model');

const getAllCareers = async (limit, page) => {
  const [total, careers] = await Promise.all([
    await Careers.countDocuments({ state: true }),
    await Careers.find({ state: true })
      .limit(limit)
      .skip((page - 1) * limit),
  ]);

  return { total, careers };
};

const getOneCareer = async (id) => {
  const career = await Careers.findById(id);
  return career;
};

const createCareer = async (rest) => {
  const career = await Careers.create(rest);
  return career;
};

const updateCareer = async (id, rest) => {
  const career = await Careers.findByIdAndUpdate(id, rest, { new: true });
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
