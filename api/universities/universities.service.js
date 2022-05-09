const University = require('./universities.model');

const getAllUniversities = async (limit, page) => {
  const [total, universities] = await Promise.all([
    University.countDocuments({ state: true }),
    University.find({ state: true })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('offer', 'name description'),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    universities,
  };
};

async function getOneUniversity(id) {
  const university = await University.findOne({ _id: id, state: true })
    .populate({
      path: 'offer',
      select: '-__v -state -createdAt -updatedAt',
      populate: { path: 'career', select: 'name' },
    });

  return university;
}

async function deleteUniversity(id) {
  const university = await University.findByIdAndUpdate(id, { state: false });

  return university;
}

async function createUniversity(newUniversity) {
  const university = await University.create(newUniversity);

  return university;
}

async function updateUniversity(id, rest) {
  const updatedUniversity = await University.findOneAndUpdate(
    { _id: id, state: true },
    rest,
    { new: true },
  ).populate({
    path: 'offer',
    select: '-__v -state -createdAt -updatedAt',
    populate: { path: 'career', select: 'name' },
  });

  return updatedUniversity;
}

async function getUniversityCountries() {
  const universities = await University.find({ state: true });
  const countries = universities.map((university) => university.address.country);
  const uniqueCountries = [...new Set(countries)];

  return uniqueCountries;
}

module.exports = {
  getAllUniversities,
  getOneUniversity,
  deleteUniversity,
  createUniversity,
  updateUniversity,
  getUniversityCountries,
};
