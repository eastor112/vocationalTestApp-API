const { Router } = require('express');

const {
  handlerUsersSearch,
  handlerUniversitiesSearch,
  handlerCareersSearch,
  handlerQuestionsSearch,
  handlerTestsSearch,
  handlerBillingsSearch,
  handlerOffersSearch,
  handlerResultsSearch,
} = require('./search.controller');

const router = Router();

router.get('/users/:query', handlerUsersSearch);
router.get('/universities/:query', handlerUniversitiesSearch);
router.get('/careers/:query', handlerCareersSearch);
router.get('/questions/:query', handlerQuestionsSearch);
router.get('/tests/:query', handlerTestsSearch);
router.get('/billings/:query', handlerBillingsSearch);
router.get('/offers/:query', handlerOffersSearch);
router.get('/results/:query', handlerResultsSearch);

module.exports = router;
