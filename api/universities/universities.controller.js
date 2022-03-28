const {
  getOneUniversity,
  getAllUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} = require('./universities.service');

const handlerAllUniversities = async (req, res) => {
  const universities = await getAllUniversities();
  res.json(universities);
};

const handlerOneUniversity = async (req, res) => {
  const { id } = req.params;
  const university = await getOneUniversity(id);
  res.json(university);
};

const handlerDeleteUniversity = async (req, res) => {
  const { id } = req.params;
  await deleteUniversity(id);
  res.json({ msg: 'University deleted' });
};
const handlerCreateUniversity = async (req, res) => {
  const { name, url } = req.body;

  if (!name) {
    res.status(400).json({ msg: 'Name is required' });
  } if (!url) {
    res.status(400).json({ msg: 'URL is required' });
  }

  const newUniversity = await createUniversity(req.body);
  res.status(201).json(newUniversity);
};
const handlerUpdateUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await updateUniversity(id, req.body);

  if (!university) {
    res.status(404).json({ message: `University not found with id: ${id}` });
  } else {
    res.json(university);
  }
};

module.exports = {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
};
