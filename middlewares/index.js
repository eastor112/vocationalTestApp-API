const fieldsValidator = require('./fieldsValidator');
const rolesValidator = require('./rolesValidator');
const tokenValidator = require('./tokenValidator');
const universityIdValidator = require('./universityIdValidator');

module.exports = {
  ...fieldsValidator,
  ...rolesValidator,
  ...tokenValidator,
  ...universityIdValidator,
};
