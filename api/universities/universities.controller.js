const {
  getOneUniversity,
  getAllUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} = require('./universities.service');

const handlerAllUniversities = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  try {
    const universities = await getAllUniversities(limit, page);
    res.json(universities);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting universities' });
  }
};

const handlerOneUniversity = async (req, res) => {
  const { id } = req.params;

  try {
    const university = await getOneUniversity(id);

    res.json(university);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting university' });
  }
};

const handlerDeleteUniversity = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUniversity(id);

    res.status(204).json({ msg: 'University deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting university' });
  }
};

const handlerCreateUniversity = async (req, res) => {
  const { _id, state, createdAt, updatedAp, __v, ...rest } = req.body;

  try {
    const newUniversity = await createUniversity(rest);

    return res.status(201).json(newUniversity);
  } catch (error) {
    return res.status(500).json({ msg: 'Error creating university' });
  }
};

const handlerUpdateUniversity = async (req, res) => {
  const { id } = req.params;
  const { _id, state, createdAt, updatedAp, __v, ...rest } = req.body;

  try {
    const university = await updateUniversity(id, rest);

    return res.json(university);
  } catch (error) {
    return res.status(500).json({ msg: 'Error updating university' });
  }
};

module.exports = {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
};
