const fieldsValidator = require('./fieldsValidator');
const rolesValidator = require('./rolesValidator');
const tokenValidator = require('./tokenValidator');

module.exports = {
  ...fieldsValidator,
  ...rolesValidator,
  ...tokenValidator,
};
