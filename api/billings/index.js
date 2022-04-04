const { Router } = require('express');
const { check } = require('express-validator');
const { billingExistById } = require('../../helpers/customValidators');
const { validateJwtMw, isAdminRoleMw, fieldsValidatorMw } = require('../../middlewares');

const {
  handlerGetAllBillings,
  handlerGetOneBilling,
  handlerCreateBilling,
  handlerUpdateBilling,
  handlerDeleteBilling,
} = require('./billings.controller');

const router = Router();

router.get('/', [
  validateJwtMw,
  isAdminRoleMw,
], handlerGetAllBillings);

router.get('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(billingExistById),
  fieldsValidatorMw,
], handlerGetOneBilling);

router.post('/', [

], handlerCreateBilling);

router.patch('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(billingExistById),
  fieldsValidatorMw,
], handlerUpdateBilling);

router.delete('/:id', [
  validateJwtMw,
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(billingExistById),
  fieldsValidatorMw,
], handlerDeleteBilling);

module.exports = router;
