const { Router } = require('express');
const { check } = require('express-validator');
const { testResultExistById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const {
  handlerGetAllTestResults,
  handlerGetOneTestResults,
  handlerCreateTestResults,
  handlerUpdateTestResults,
  handlerDeleteTestResults,
  hadlerDestroyTestResults,
} = require('./testResults.controller');

const router = Router();

router.get('/', [
  validateJwtMw,
], handlerGetAllTestResults);

router.get('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(testResultExistById),
  fieldsValidatorMw,
], handlerGetOneTestResults);

router.post('/', [
  validateJwtMw,
], handlerCreateTestResults);

router.patch('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(testResultExistById),
  fieldsValidatorMw,
], handlerUpdateTestResults);

router.delete('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(testResultExistById),
  fieldsValidatorMw,
], handlerDeleteTestResults);

router.delete('/:id/destroy', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(testResultExistById),
  fieldsValidatorMw,
], hadlerDestroyTestResults);

module.exports = router;
