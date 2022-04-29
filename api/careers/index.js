const { Router } = require('express');
const { check } = require('express-validator');
const { careerExistById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { isAdminRoleMw } = require('../../middlewares/rolesValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const upload = require('../../config/multer');

const {
  handlerGetAllCareersNames,
  handlerGetAllCareers,
  handlerGetOneCareer,
  handlerCreateCareer,
  handlerUpdateCareer,
  handlerDeleteCareer,
} = require('./careers.controller');

const router = Router();

router.get('/names', handlerGetAllCareersNames);

router.get('/', [], handlerGetAllCareers);

router.get('/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(careerExistById),
  fieldsValidatorMw,
], handlerGetOneCareer);

router.post('/', [
  validateJwtMw,
  isAdminRoleMw,
  check('name', 'name is required').notEmpty(),
  fieldsValidatorMw,
], handlerCreateCareer);

router.patch('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(careerExistById),
  fieldsValidatorMw,
  upload.single('photo'),
], handlerUpdateCareer);

router.delete('/:id', [
  validateJwtMw,
  isAdminRoleMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(careerExistById),
  fieldsValidatorMw,
], handlerDeleteCareer);

module.exports = router;
