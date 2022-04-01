const { validationResult } = require('express-validator');

const fieldsValidatorMw = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

module.exports = {
  fieldsValidatorMw,
};
