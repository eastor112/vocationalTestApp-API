const UserModel = require('./users.model');

const getAllUsers = async () => UserModel.find();

async function getOneUser(id) {
  const task = await UserModel.findById(id);

  if (!task) {
    return null;
  }

  return task;
}

async function deleteUser(id) {
  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    return null;
  }

  return user;
}

async function createUser(newUser) {
  return new UserModel(newUser).save();
}

async function updateUser(id, user) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
};
