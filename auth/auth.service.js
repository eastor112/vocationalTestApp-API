const jwt = require('jsonwebtoken');

const signToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return token;
  } catch (error) {
    return null;
  }
};

const activateAccount = async (req, res) => {
};

module.exports = {
  signToken,
  activateAccount,
};
