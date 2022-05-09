const { Router } = require('express');
const { check } = require('express-validator');
const { universityExistById } = require('../../helpers/customValidators');
const { validateJwtMw, fieldsValidatorMw } = require('../../middlewares');
const upload = require('../../config/multer');

const {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
  handlerDeleteImageUniversity,
  handlerGetUniversityCountries,
} = require('./universities.controller');
const { universityIdValidatorMw } = require('../../middlewares');

const router = Router();

router.get('/', handlerAllUniversities);

router.get('/:id', [
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(universityExistById),
  fieldsValidatorMw,
], handlerOneUniversity);

router.delete('/:id', [
  validateJwtMw,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(universityExistById),
  fieldsValidatorMw,
], handlerDeleteUniversity);

router.post('/', [
  check('name').not().isEmpty().withMessage('Name is required'),
  fieldsValidatorMw,
], handlerCreateUniversity);

router.patch('/:id', [
  validateJwtMw,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(universityExistById),
  universityIdValidatorMw,
  fieldsValidatorMw,
  upload.fields([{
    name: 'logo',
    maxCount: 1,
  }, {
    name: 'campus',
    maxCount: 1,
  }]),

], handlerUpdateUniversity);

router.delete('/:id/dropimages', [
  validateJwtMw,
  check('id', 'is not a valid id').isMongoId(),
  universityIdValidatorMw,
  fieldsValidatorMw,
], handlerDeleteImageUniversity);

router.get('/countries/codes', handlerGetUniversityCountries);

module.exports = router;
