const {
  getOneUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} = require('./users.service');

const handlerAllUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
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
  await deleteUser(id);
  res.json({ msg: 'User deleted' });
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
  const user = await updateUser(id, req.body);

  if (!user) {
    res.status(404).json({ message: `User not found with id: ${id}` });
  } else {
    res.json(user);
  }
};

module.exports = {
  handlerAllUsers,
  handlerOneUser,
  handlerDeleteUser,
  handlerCreateUser,
  handlerUpdateUser,
};
