const User = require('./users.model');

const getAllUsers = async (limit, page) => {
  const query = { state: true };

  const [total, users] = await Promise.all([
    await User.countDocuments(query),
    await User.find(query).limit(limit).skip(limit * (page - 1)),
  ]);
  return { total, users };
};

const getOneUser = async (id) => {
  const task = await User.findById(id);

  if (!task) {
    return null;
  }

  return task;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });

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
