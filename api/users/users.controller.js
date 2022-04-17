const {
  getOneUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} = require('./users.service');
const { uploadToCloudinaryAndCleanTemp } = require('../../helpers/cloudinaryActions');

const handlerAllUsers = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  try {
    const users = await getAllUsers(limit, page);

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error getting users' });
  }
};

const handlerOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getOneUser(id);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting user' });
  }
};

const handlerDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { email } = await deleteUser(id);

    res.status(204).json({ msg: `User ${email} was deleted` });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting user' });
  }
};

const handlerCreateUser = async (req, res) => {
  const {
    _id,
    __v,
    state,
    google,
    passResetToken,
    passResetExpires,
    updatedAt,
    createddAt,
    ...rest
  } = req.body;

  if (rest.role === 'ADMIN') {
    return res.status(400).json({ msg: 'Admin role is not allowed' });
  }

  try {
    const user = await createUser(rest);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const handlerUpdateUser = async (req, res) => {
  const { id } = req.params;
  const {
    _id,
    __v,
    email,
    state,
    google,
    passResetToken,
    passResetExpires,
    updatedAt,
    createddAt,
    ...rest
  } = req.body;

  if (rest.role === 'ADMIN') {
    return res.status(400).json({ msg: 'Admin role is not allowed' });
  }

  try {
    if (req.file) {
      const secureUrl = await uploadToCloudinaryAndCleanTemp(req.file.path, 'users');
      rest.profile = secureUrl;
    }

    const user = await updateUser(id, rest);

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  handlerAllUsers,
  handlerOneUser,
  handlerDeleteUser,
  handlerCreateUser,
  handlerUpdateUser,
};
