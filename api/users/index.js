const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, emailExist, userExistById } = require('../../helpers/customValidators');

const {
  fieldsValidatorMw,
  isAdminRoleMw,
  validateJwtMw,
} = require('../../middlewares');

const {
  handlerAllUsers,
  handlerOneUser,
  handlerDeleteUser,
  handlerCreateUser,
  handlerUpdateUser,
} = require('./users.controller');

const router = Router();

router.get('/', [

], handlerAllUsers);

router.get('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userExistById),
  fieldsValidatorMw,
], handlerOneUser);

router.delete('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userExistById),
  fieldsValidatorMw,
], handlerDeleteUser);

router.post('/', [
  check('email', 'email is not valid').isEmail(),
  check('email').custom(emailExist),
  check('password', 'password must be greater than 5 characters').isLength({ min: 6 }),
  check('role').custom(isValidRole),
  fieldsValidatorMw,
], handlerCreateUser);

router.patch('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userExistById),
  check('role').custom(isValidRole),
  fieldsValidatorMw,
], handlerUpdateUser);

module.exports = router;
