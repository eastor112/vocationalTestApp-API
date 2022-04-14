const UniversitiesModel = require('./universities.model');

const getAllUniversities = async (limit, page) => {
  const [total, universities] = await Promise.all([
    UniversitiesModel.countDocuments({ state: true }),
    UniversitiesModel.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('offer', 'name'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    universities,
  };
};

async function getOneUniversity(id) {
  const university = await UniversitiesModel.findOne({ _id: id, state: true })
    .populate('offer', 'name');

  if (!university) {
    return null;
  }

  return university;
}

async function deleteUniversity(id) {
  const university = await UniversitiesModel.findByIdAndUpdate(id, { state: false });

  return university;
}

async function createUniversity(newUniversity) {
  const university = await UniversitiesModel.create(newUniversity);

  return university;
}

async function updateUniversity(id, university) {
  const updatedUniversity = await UniversitiesModel.findOneAndUpdate(
    { _id: id, state: true },
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
