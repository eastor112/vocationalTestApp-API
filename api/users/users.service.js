const crypto = require('crypto');
const { sendMailWithSengrid } = require('../../utils/email');
const User = require('./users.model');
const cloudinary = require('../../config/cloudinary');
const { cleanCloudinary } = require('../../helpers/cloudinaryActions');

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

  return task;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });

  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);

  newUser.passResetToken = crypto.randomBytes(20).toString('hex');
  newUser.passResetExpires = Date.now() + 3600000 * 24;

  await newUser.save();

  const email = {
    from: '"no reply" <emerar.mct@gmail.com>',
    to: newUser.email,
    subject: 'Activate your account',
    template_id: 'd-ab97f9d7fb4c4c428d236ba38304d2ec',
    dynamic_template_data: {
      url: `${process.env.NODE_ENV === 'develop' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD}/activate/${newUser.passResetToken}`,
    },
  };

  await sendMailWithSengrid(email);

  return newUser;
};

const updateUser = async (id, rest) => {
  const userOld = await User.findById(id);

  if (rest.profile) cleanCloudinary(userOld.profile, 'users');

  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true })
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
