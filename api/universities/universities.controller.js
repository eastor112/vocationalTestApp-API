const { uploadToCloudinaryAndCleanTemp, cleanLocal, cleanCloudinary } = require('../../helpers/cloudinaryActions');
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
    res.status(500).json({ msg: error.message });
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
  const universityOld = req.university;
  const { _id, state, logo, campus, createdAt, updatedAp, __v, ...rest } = req.body;

  try {
    if (req.files) {
      const { logo: logoo, campus: campuss } = req.files;

      if (campuss) {
        if (universityOld.campus.length < 5) {
          const secureUrlCampus = await uploadToCloudinaryAndCleanTemp(
            campuss[0].path,
            `universities/${universityOld.id}`,
          );
          rest.campus = [...universityOld.campus, secureUrlCampus];
        } else {
          cleanLocal(campuss[0].path);

          if (logoo) cleanLocal(logoo[0].path);

          return res.status(400).json({ msg: 'You can only add 5 images' });
        }
      }

      if (logoo) {
        const secureUrlLogo = await uploadToCloudinaryAndCleanTemp(
          logoo[0].path,
          `universities/${universityOld.id}`,
        );
        rest.logo = secureUrlLogo;
        cleanCloudinary(universityOld.logo, `universities/${universityOld.id}`);
      }
    }

    const university = await updateUniversity(id, rest);

    return res.json(university);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const handlerDeleteImageUniversity = async (req, res) => {
  const { target, img } = req.query;
  const universityOld = req.university;

  if (target === 'logo') {
    cleanCloudinary(universityOld.logo, `universities/${universityOld.id}`);
    universityOld.logo = null;

    universityOld.save();
    return res.status(204).json({ msg: 'Image deleted' });
  }

  if (target === 'campus') {
    if (universityOld.campus.includes(img)) {
      cleanCloudinary(img, `universities/${universityOld.id}`);

      universityOld.campus = universityOld.campus.filter(
        (campus) => campus !== img,
      );
      universityOld.save();

      return res.status(204).json({ msg: 'Image deleted' });
    }
    return res.status(400).json({ msg: 'Image not found' });
  }

  return res.status(400).json({ msg: 'invalid target' });
};

module.exports = {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
  handlerDeleteImageUniversity,
};
