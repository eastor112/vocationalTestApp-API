const User = require('../api/users/users.model');
const Role = require('../commonModels/roles');

const isValidRole = async (rol = '') => {
  const role = await Role.findOne({ rol });
  if (!role) {
    throw new Error(`the role ${rol} dosn't exist`);
  }
};

const userExistById = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.state) {
    throw new Error(`the user with id ${id} doesn't exist`);
  }
};

const emailExist = async (email = '') => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`the email ${email} is alreaddy registered`);
  }
};

module.exports = {
  isValidRole,
  userExistById,
  emailExist,
};
