const User = require('../../api/users/users.model');
const { signToken } = require('../auth.service');

const handlerLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: 'Email or password is incorrect',
    });
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      message: 'Email or password is incorrect',
    });
  }

  if (!user.state) {
    return res.status(400).json({
      msg: 'Email or password is incorrect ',
    });
  }

  try {
    const token = await signToken(user.public);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong with token',
    });
  }
};

module.exports = handlerLogin;
