const {
  getOneCareer,
  getAllCareers,
  deleteCareer,
  createCareer,
  updateCareer,
} = require('./careers.service');

const handlerAllCareers = async (req, res) => {
  const careers = await getAllCareers();
  res.json(careers);
};

const handlerOneCareer = async (req, res) => {
  const { id } = req.params;
  const career = await getOneCareer(id);
  res.json(career);
};

const handlerDeleteCareer = async (req, res) => {
  const { id } = req.params;
  await deleteCareer(id);
  res.json({ msg: 'Career has been deleted' });
};

const handlerCreateCareer = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).json({ msg: 'the name Of Career is required' });
  } if (!description) {
    res.status(400).json({ msg: 'Enter the description for this career' });
  // } if (!universityName) {
  //   res.status(400).json({ msg: 'universityName is required' });
  // }
  }

  const newCareer = await createCareer(req.body);
  res.status(201).json(newCareer);
};

const handlerUpdateCareer = async (req, res) => {
  const { id } = req.params;

  const career = updateCareer(id, req.body);

  if (!career) {
    res.status(404).json({ message: `Career not found with id: ${id}` });
  } else {
    res.json(career);
  }
};

module.exports = {
  handlerAllCareers,
  handlerOneCareer,
  handlerDeleteCareer,
  handlerCreateCareer,
  handlerUpdateCareer,
};
