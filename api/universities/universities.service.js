const UniversitiesModel = require('./universities.model');

const getAllUniversities = async () => UniversitiesModel.find();

async function getOneUniversity(id) {
  const university = await UniversitiesModel.findById(id);
  if (!university) {
    return null;
  }
  return university;
}

async function deleteUniversity(id) {
  const university = await UniversitiesModel.findByIdAndDelete(id);

  if (!university) {
    return null;
  }

  return university;
}

async function createUniversity(newUniversity) {
  return new UniversitiesModel(newUniversity).save();
}

async function updateUniversity(id, university) {
  const updatedUniversity = await UniversitiesModel.findByIdAndUpdate(
    id,
    university,
    { new: true },
  );
  return updatedUniversity;
}

module.exports = {
  getAllUniversities,
  getOneUniversity,
  deleteUniversity,
  createUniversity,
  updateUniversity,
};
