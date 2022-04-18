const { Router } = require('express');
const { check } = require('express-validator');
const { questionResponseExistById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const { isAdminRoleMw, hasRoleMw } = require('../../middlewares/rolesValidator');

const router = Router();
const {
  handlerGeTAllQuestionsResponse,
  handlerGetOneQuestionResponse,
  handlerCreateQuestionResponse,
  handlerUpdateQuestionResponse,
  handlerDeleteQuestionResponse,
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
  isAdminRoleMw,
  fieldsValidatorMw,
], handlerCreateQuestionResponse);
router.patch('/:id', [
  check('id', 'id is required').notEmpty(),
  check('id', 'Enter a valid id').isMongoId(),
  check('id').custom(questionResponseExistById),
  isAdminRoleMw,
  fieldsValidatorMw,
], handlerUpdateQuestionResponse);
router.delete('/:id', [
  check('id', 'id is required').notEmpty(),
  check('id', 'Enter a valid id').isMongoId(),
  check('id').custom(questionResponseExistById),
  isAdminRoleMw,
  fieldsValidatorMw,
], handlerDeleteQuestionResponse);

module.exports = router;
