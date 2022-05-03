const { Router } = require('express');
const { check } = require('express-validator');
const { offersExistById, isCareerMongoIdAndExistOrEmpty, isUniversityMongoIdAndExistOrEmpty } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const {
  handlerGetAllOffers,
  handlerGetOneOffer,
  handlerCreateOffer,
  handlerUpdateOffer,
  handlerDeleteOffer,
  handlerDestroyOffer,
} = require('./offers.controller');
const upload = require('../../config/multer');

const router = Router();

router.get('/', [], handlerGetAllOffers);

router.get('/:id', [
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  fieldsValidatorMw,
], handlerGetOneOffer);

router.post('/', [
  validateJwtMw,
  check('name', 'name is required').notEmpty(),
  fieldsValidatorMw,
], handlerCreateOffer);

router.patch('/:id', [
  validateJwtMw,
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  check('university').custom(isUniversityMongoIdAndExistOrEmpty),
  fieldsValidatorMw,
  upload.single('photo'),
], handlerUpdateOffer);

router.delete('/:id', [
  validateJwtMw,
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  fieldsValidatorMw,
], handlerDeleteOffer);

router.delete('/:id/destroy', [
  validateJwtMw,
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  fieldsValidatorMw,
], handlerDestroyOffer);

module.exports = router;
