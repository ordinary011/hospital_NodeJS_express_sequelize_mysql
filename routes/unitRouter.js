const router = require('express').Router();

const findAllUnits = require('../controllers/unit/findAllUnits');
const doctorsInUnit = require('../controllers/unit/doctorsInUnit');

router.get('/', findAllUnits);
router.get('/:id', doctorsInUnit);

module.exports = router;