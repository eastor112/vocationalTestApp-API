const User = require('./users.model');

const getAllUsers = async () => User.find();

async function getOneUser(id) {
  const task = await User.findById(id);

  if (!task) {
    return null;
  }

  return task;
}

async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return null;
  }

  return user;
}

async function createUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

async function updateUser(id, user) {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
};
