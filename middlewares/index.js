const fieldsValidator = require('./filedsValidator');
const rolesValidator = require('./rolesValidator');
const tokenValidator = require('./tokenValidator');

module.exports = {
  ...fieldsValidator,
  ...rolesValidator,
  ...tokenValidator,
};
