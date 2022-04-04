const { Router } = require('express');
const { check } = require('express-validator');
const { vocationalTestExistsById } = require('../../helpers/customValidators');
const { fieldsValidatorMw } = require('../../middlewares/fieldsValidator');
const { validateJwtMw } = require('../../middlewares/tokenValidator');

const {
  handlerGetAllTests,
  handlerGetOneTest,
  handlerCreateTest,
  handlerDeleteTest,
  handlerUpdateTest,
} = require('./vocationalTest.controller');

const router = Router();
router.get('/', handlerGetAllTests);
router.get(
  '/:id',
  [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(vocationalTestExistsById),
    fieldsValidatorMw,
  ],
  handlerGetOneTest,
);
router.post(
  '/',
  [
    validateJwtMw,
  ],
  handlerCreateTest,
);
router.patch(
  '/:id',
  [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(vocationalTestExistsById),
    fieldsValidatorMw,
  ],
  handlerUpdateTest,
);
router.delete(
  '/:id',
  [check('id', 'id is not valid').isMongoId(),
    check('id').custom(vocationalTestExistsById),
    fieldsValidatorMw],
  handlerDeleteTest,
);

module.exports = router;
