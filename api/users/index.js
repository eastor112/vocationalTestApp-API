const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, isValidRoleOrEmpty, emailExist, userExistById } = require('../../helpers/customValidators');
const upload = require('../../config/multer');

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
  handlerDestroyUser,
} = require('./users.controller');

const router = Router();

router.get('/', [
  validateJwtMw,
  isAdminRoleMw,
], handlerAllUsers);

router.get('/:id', [
  validateJwtMw,
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
  check('password', 'pasword is required').exists(),
  check('password', 'password must be greater than 5 characters').isLength({ min: 6 }),
  check('role').custom(isValidRole),
  fieldsValidatorMw,
], handlerCreateUser);

router.patch('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userExistById),
  check('role').custom(isValidRoleOrEmpty),
  fieldsValidatorMw,
  upload.single('profile'),
], handlerUpdateUser);

router.delete('/:id/destroy', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userExistById),
  fieldsValidatorMw,
], handlerDestroyUser);

module.exports = router;
