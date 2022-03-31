const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../api/users/users.model');

const validateJwtMw = async (req = request, res = response, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      msg: 'There is no token',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { uid } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'invalid token',
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'invalid token - state',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: error.message,
    });
  }
};

module.exports = {
  validateJwtMw,
};
