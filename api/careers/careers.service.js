const CareerModel = require('./careers.model');

const getAllCareers = async () => CareerModel.find();

async function getOneCareer(id) {
  const task = await UserModel.findById(id);

  if (!task) {
    return null;
  }

  return task;
}

async function deleteCareer(id) {
  const career = await CareerModel.findByIdAndDelete(id);

  if (!career) {
    return null;
  }

  return career;
}

function createCareer(newCareer) {
  return new CareerModel(newCareer).save();
}

function updateCareer(id, career) {
  return CareerModel.findByIdAndUpdate(id, career, { new: true });
}

module.exports = {
  getAllCareers,
  getOneCareer,
  deleteCareer,
  createCareer,
  updateCareer,
};
