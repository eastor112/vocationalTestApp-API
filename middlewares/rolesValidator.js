const { response } = require('express');

const isAdminRoleMw = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to verify the role without validating the token first',
    });
  }

  const { role, names } = req.user;

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `${names} are not an administrator - You cannot do this`,
    });
  }

  return next();
};

const hasRoleMw = (...roles) => (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to verify the role without validating the token first',
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(401).json({
      msg: `The service requires one of these roles ${roles}`,
    });
  }

  return next();
};

module.exports = {
  isAdminRoleMw,
  hasRoleMw,
};
