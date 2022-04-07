const User = require('../../api/users/users.model');
const { signToken } = require('../auth.service');

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

module.exports = handlerLogin;
