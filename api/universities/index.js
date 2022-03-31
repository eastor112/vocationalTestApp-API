const { Router } = require('express');
const { check } = require('express-validator');
const { universityExistById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');

const {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
} = require('./universities.controller');

const router = Router();

router.get('/', handlerAllUniversities);

router.get('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(universityExistById),
  fieldsValidatorMw,
], handlerOneUniversity);

router.delete('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  fieldsValidatorMw], handlerDeleteUniversity);

router.post('/', [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('url').not().isEmpty().withMessage('URL is required'), fieldsValidatorMw], handlerCreateUniversity);

router.patch(
  '/:id',
  [
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(universityExistById),
    fieldsValidatorMw],
  handlerUpdateUniversity,
);

module.exports = router;
