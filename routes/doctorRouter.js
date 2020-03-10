const router = require('express').Router();

const findByName = require('../controllers/doctor/findByName');
const findInfo = require('../controllers/doctor/findInfo');

router.get('/', findByName);
router.get('/:id', findInfo);

module.exports = router;