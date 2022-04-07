const { Router } = require('express');
const { check } = require('express-validator');
const { vocationalTestExistsById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const { isAdminRoleMw } = require('../../middlewares');

const {
  handlerGetAllTests,
  handlerGetOneTest,
  handlerCreateTest,
  handlerDeleteTest,
  handlerUpdateTest,
} = require('./vocationalTest.controller');

const router = Router();
router.get('/', [
  validateJwtMw,
], handlerGetAllTests);

router.get('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(vocationalTestExistsById),
  fieldsValidatorMw,
], handlerGetOneTest);

router.post('/', [
  validateJwtMw,
  isAdminRoleMw,
], handlerCreateTest);

router.patch('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(vocationalTestExistsById),
  fieldsValidatorMw,
], handlerUpdateTest);

router.delete('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(vocationalTestExistsById),
  fieldsValidatorMw,
], handlerDeleteTest);

module.exports = router;
