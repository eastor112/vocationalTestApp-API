const { Router } = require('express');
const {
  handlerAllCareers,
  handlerOneCareer,
  handlerDeleteCareer,
  handlerCreateCareer,
  handlerUpdateCareer,
} = require('./careers.controller');

const router = Router();

router.get('/', handlerAllCareers);
router.get('/:id', handlerOneCareer);
router.delete('/:id', handlerDeleteCareer);
router.post('/', handlerCreateCareer);
router.patch('/:id', handlerUpdateCareer);

module.exports = router;
