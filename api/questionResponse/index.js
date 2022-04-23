const { Router } = require('express');
const { check } = require('express-validator');
const { questionResponseExistById } = require('../../helpers/customValidators');
const { hasRoleMw, validateJwtMw, fieldsValidatorMw } = require('../../middlewares');

const router = Router();
const {
  handlerGeTAllQuestionsResponse,
  handlerGetOneQuestionResponse,
  handlerCreateQuestionResponse,
  handlerUpdateQuestionResponse,
  handlerDeleteQuestionResponse,
  handlerCreateQuestionResponseMultiple,
} = require('./questionResponse.controller');

router.get('/', [
  hasRoleMw,
  validateJwtMw,
], handlerGeTAllQuestionsResponse);

router.get('/:id', [
  check('id', 'id is required').notEmpty(),
  check('id', 'Enter a valid id').isMongoId(),
  check('id').custom(questionResponseExistById),
  fieldsValidatorMw,
], handlerGetOneQuestionResponse);

router.post('/', [
  validateJwtMw,
], handlerCreateQuestionResponse);

router.post('/multiple', [
  validateJwtMw,
], handlerCreateQuestionResponseMultiple);

router.patch('/:id', [
  check('id', 'id is required').notEmpty(),
  check('id', 'Enter a valid id').isMongoId(),
  check('id').custom(questionResponseExistById),
  fieldsValidatorMw,
], handlerUpdateQuestionResponse);

router.delete('/:id', [
  check('id', 'id is required').notEmpty(),
  check('id', 'Enter a valid id').isMongoId(),
  check('id').custom(questionResponseExistById),
  fieldsValidatorMw,
], handlerDeleteQuestionResponse);

module.exports = router;
