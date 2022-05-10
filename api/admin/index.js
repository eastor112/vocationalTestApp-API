const { Router } = require('express');
const {
  handlerGetBalance,
  handlerGetBalanceByDate,
  handlerBalanceLastMonth,
  handlerGetBalanceDayByDay,
  handlerGetStats,
} = require('./admin.controller');
const {
  validateJwtMw,
  isAdminRoleMw,
} = require('../../middlewares');

const router = Router();

router.get('/stats', [
  validateJwtMw,
  isAdminRoleMw,
], handlerGetStats);

router.get('/balance', [
  validateJwtMw,
  isAdminRoleMw,
], handlerGetBalance);

router.get('/balance/last-month', [
  validateJwtMw,
  isAdminRoleMw,
], handlerBalanceLastMonth);

router.get('/balance/day-by-day', [
  validateJwtMw,
  isAdminRoleMw,
], handlerGetBalanceDayByDay);

router.get('/balance/:date', [
  validateJwtMw,
  isAdminRoleMw], handlerGetBalanceByDate);

module.exports = router;
