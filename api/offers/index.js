const { Router } = require('express');
const { check, body, sanitizeBody } = require('express-validator');
const { offersExistById, isCareerMongoIdAndExistOrEmpty, isUniversityMongoIdAndExistOrEmpty } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');
const {
  handlerGetAllOffers,
  handlerGetOneOffer,
  handlerCreateOffer,
  handlerUpdateOffer,
  handlerDeleteOffer,
} = require('./offers.controller');

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
  check('university', 'university id is required').notEmpty(),
  check('university', 'university id is not valid').isMongoId(),
  check('career').custom(isCareerMongoIdAndExistOrEmpty),
  fieldsValidatorMw,
], handlerCreateOffer);

router.patch('/:id', [
  validateJwtMw,
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  check('university').custom(isUniversityMongoIdAndExistOrEmpty),
  check('career').custom(isCareerMongoIdAndExistOrEmpty),
  fieldsValidatorMw,
], handlerUpdateOffer);

router.delete('/:id', [
  validateJwtMw,
  check('id').isMongoId(),
  check('id').custom(offersExistById),
  fieldsValidatorMw,
], handlerDeleteOffer);

module.exports = router;
