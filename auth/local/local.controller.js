const User = require('../../api/users/users.model');
const { signToken, activateAccount } = require('../auth.service');

const handlerLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: 'Email or password is incorrect - user',
    });
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      msg: 'Email or password is incorrect - password',
    });
  }

  if (!user.state) {
    return res.status(400).json({
      msg: 'Email or password is incorrect - state',
    });
  }

  try {
    const token = await signToken(user.public);

    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong with token',
    });
  }
};

const handlerActivateAccount = async (req, res) => {
  const { token: hash } = req.params;

  const user = await User.findOne({ passResetToken: hash });

  if (!user) {
    return res.status(400).json({
      msg: 'Token is incorrect',
    });
  }

  if (user.passResetExpires < Date.now()) {
    User.deleteOne({ passResetToken: hash });
    return res.status(400).json({
      msg: 'Token is expired',
    });
  }

  user.state = true;
  user.passResetToken = null;
  user.passResetExpires = null;

  await user.save();

  try {
    const token = await signToken(user.public);

    return res.status(200).json({
      msg: 'Account activated',
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'account user is active but Something went wrong',
    });
  }
};

const handlerReLogin = async (req, res) => {
  const { user } = req;

  try {
    const token = await signToken(user.public);

    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong with token',
    });
  }
};

module.exports = {
  handlerLogin,
  handlerActivateAccount,
  handlerReLogin,
};
