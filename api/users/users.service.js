const User = require('./users.model');

const getAllUsers = async (limit, page) => {
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name'),
  ]);
  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    users,
  };
};

const getOneUser = async (id) => {
  const task = await User.findById(id)
    .populate('university', 'name');

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
  const newUser = await User.create(user)
    .populate('university', 'name');

  return newUser;
};

const updateUser = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
    .populate('university', 'name');

  return updatedUser;
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
};
