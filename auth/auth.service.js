const jwt = require('jsonwebtoken');

const signToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return token;
  } catch (error) {
    return null;
  }
};

module.exports = {
  signToken,
};
