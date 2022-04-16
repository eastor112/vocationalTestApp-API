const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidatorMw, validateJwtMw } = require('../../middlewares');
const { handlerLogin, handlerActivateAccount, handlerReLogin } = require('./local.controller');

const router = Router();

router.post('/', [
  check('email', 'email is not valid').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  fieldsValidatorMw,
], handlerLogin);

router.get('/activate/:token', handlerActivateAccount);

router.post('/validate', [
  validateJwtMw,
], handlerReLogin);

module.exports = router;
