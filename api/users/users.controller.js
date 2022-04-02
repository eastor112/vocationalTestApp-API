const {
  getOneUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} = require('./users.service');

const handlerAllUsers = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { total, users } = await getAllUsers(limit, page);

  res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    users,
  });
};

const handlerOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await getOneUser(id);
  if (!user) {
    return res.status(404).json({ message: `User not found with id: ${id}` });
  }
  return res.json(user);
};

const handlerDeleteUser = async (req, res) => {
  const { id } = req.params;
  const { email } = await deleteUser(id);
  res.json({ msg: `User ${email} was deleted` });
};

const handlerCreateUser = async (req, res) => {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const handlerUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, email, state, role, ...rest } = req.body;

  if (!rest.password || rest.password.length < 6) {
    return res.status(400).json({ message: 'password must be greater than 5 characters' });
  }

  try {
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
