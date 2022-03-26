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
  res.json(user);
};

const handlerDeleteUser = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.json({ msg: 'User deleted' });
};

const handlerCreateUser = async (req, res) => {
  const { password, email, role } = req.body;

  if (!password) {
    res.status(400).json({ msg: 'Password is required' });
  } if (!email) {
    res.status(400).json({ msg: 'Email is required' });
  } if (!role) {
    res.status(400).json({ msg: 'Role is required' });
  }

  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
};

const handlerUpdateUser = async (req, res) => {
  const { id } = req.params;

  const user = updateUser(id, req.body);

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
