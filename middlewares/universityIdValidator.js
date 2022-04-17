const University = require('../api/universities/universities.model');

const universityIdValidatorMw = async (req, res, next) => {
  const { id } = req.params;

  const university = await University.findOne({ _id: id, state: true });

  if (!university) {
    return res.status(404).json({ msg: `the university with id ${id} doesn't exist` });
  }

  req.university = university;

  return next();
};

module.exports = {
  universityIdValidatorMw,
};
