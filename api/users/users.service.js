const User = require('./users.model');

const getAllUsers = async () => User.find();

const getOneUser = async (id) => {
  const task = await User.findById(id);

  if (!task) {
    return null;
  }

  return task;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return null;
  }

  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const updateUser = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
};
