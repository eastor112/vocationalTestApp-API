const { Router } = require('express');

const { handlerCheckout } = require('./checkout.controller');

const { validateJwtMw } = require('../../middlewares/tokenValidator');

const router = Router();

router.post('/', [validateJwtMw], handlerCheckout);

module.exports = router;
