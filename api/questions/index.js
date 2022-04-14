const { Router } = require('express');
const { check } = require('express-validator');
const { questionExistsById, TestExistsById, isValidQuestionType } = require('../../helpers/customValidators');
const { isAdminRoleMw } = require('../../middlewares');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');

const {
  handlerAllQuestions,
  handlerOneQuestion,
  handlerDeleteQuestion,
  handlerCreateQuestion,
  handlerUpdateQuestion,
} = require('./questions.controller');

const router = Router();

router.get('/', [
  validateJwtMw,
], handlerAllQuestions);

router.get('/:id', [
  validateJwtMw,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(questionExistsById),
  fieldsValidatorMw,
], handlerOneQuestion);

router.delete('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(questionExistsById),
  fieldsValidatorMw,
], handlerDeleteQuestion);

router.post('/', [
  validateJwtMw,
  isAdminRoleMw,
  check('test', 'is not a test id').isMongoId(),
  check('test').custom(TestExistsById),
  check('type').custom(isValidQuestionType),
  fieldsValidatorMw,
], handlerCreateQuestion);

router.patch('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(questionExistsById),
  fieldsValidatorMw,
], handlerUpdateQuestion);

module.exports = router;
