const { Router } = require('express');

const {
  handlerAllUniversities,
  handlerOneUniversity,
  handlerDeleteUniversity,
  handlerCreateUniversity,
  handlerUpdateUniversity,
} = require('./universities.controller');

const router = Router();

router.get('/', handlerAllUniversities);
router.get('/:id', handlerOneUniversity);
router.delete('/:id', handlerDeleteUniversity);
router.post('/', handlerCreateUniversity);
router.patch('/:id', handlerUpdateUniversity);

module.exports = router;
