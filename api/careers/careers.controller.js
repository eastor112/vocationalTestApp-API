const {
  getAllCareers,
  getOneCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  destroyCareer,
} = require('./careers.service');
const { uploadToCloudinaryAndCleanTemp } = require('../../helpers/cloudinaryActions');
const CareersNames = require('../../commonModels/careersNames');

const handlerGetAllCareersNames = async (req, res) => {
  try {
    const careersNames = await CareersNames.find({});

    res.json(careersNames);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting careers names' });
  }
};

const handlerGetAllCareers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const careers = await getAllCareers(limit, page);

    res.json(careers);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting careers' });
  }
};

const handlerGetOneCareer = async (req, res) => {
  const { id } = req.params;

  try {
    const career = await getOneCareer(id);

    if (!career.state) {
      return res.status(404).json({ msg: 'Career not found' });
    }

    return res.json(career);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting career' });
  }
};

const handlerCreateCareer = async (req, res) => {
  const { _id, state, __v, updatedAt, createdAt, ...rest } = req.body;

  try {
    const career = await createCareer(rest);

    res.status(201).json(career);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating career' });
  }
};

const handlerUpdateCareer = async (req, res) => {
  const { id } = req.params;
  const { _id, state, __v, updatedAt, createdAt, ...rest } = req.body;

  try {
    if (req.file) {
      const secureUrl = await uploadToCloudinaryAndCleanTemp(req.file.path, 'careers');
      rest.photo = secureUrl;
    }

    const career = await updateCareer(id, rest);

    res.json(career);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const handlerDeleteCareer = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCareer(id);

    return res.status(204).json({ msg: `Career deleted with id${id}` });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting career' });
  }
};

const handleDestroyCareer = async (req, res) => {
  const { id } = req.params;
  try {
    await destroyCareer(id);

    return res.status(204).json({ msg: `Career deleted with id${id}` });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting career' });
  }
};

module.exports = {
  handlerGetAllCareersNames,
  handlerGetAllCareers,
  handlerGetOneCareer,
  handlerCreateCareer,
  handlerUpdateCareer,
  handlerDeleteCareer,
  handleDestroyCareer,
};
