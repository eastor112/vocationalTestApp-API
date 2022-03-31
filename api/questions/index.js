const { Router } = require('express');
const { check } = require('express-validator');
const { questionExistsById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');

const {
  handlerAllQuestions,
  handlerOneQuestion,
  handlerDeleteQuestion,
  handlerCreateQuestion,
  handlerUpdateQuestion,
} = require('./questions.controller');

const router = Router();

router.get('/', handlerAllQuestions);

router.get('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(questionExistsById), fieldsValidatorMw,
], handlerOneQuestion);

router.delete('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  fieldsValidatorMw], handlerDeleteQuestion);

router.post('/', [
  check('idTest').not().isEmpty().withMessage('idTest is required'),
  check('type').not().isEmpty().withMessage('type is required'),
  check('statement').not().isEmpty().withMessage('statement is required'),
  check('optionA').not().isEmpty().withMessage('optionA is required'),
  check('optionB').not().isEmpty().withMessage('optionB is required'),
  check('optionC').not().isEmpty().withMessage('optionC is required'),
  check('optionD').not().isEmpty().withMessage('optionD is required'),
  fieldsValidatorMw], handlerCreateQuestion);

router.patch('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(questionExistsById),
  fieldsValidatorMw], handlerUpdateQuestion);

module.exports = router;
