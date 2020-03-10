const router = require('express').Router();

const patientLogIn = require('../controllers/auth/patientLogIn');
const patientVerify = require('../controllers/auth/patientVerify');

const patientSignUp = require('../controllers/patient/patientSignUp');

const patientAppreciate = require('../controllers/patient/patientAppreciate');

const patientAddComment = require('../controllers/patient/patientAddComment');
const patientDelComment = require('../controllers/patient/patientDelComment');
const patientUpdateComment = require('../controllers/patient/patientUpdateComment');



router.post('/', patientSignUp);

router.post('/logIn', patientLogIn);
router.get('/verify', patientVerify);

router.post('/appreciate', patientAppreciate);

router.post('/comment', patientAddComment);
router.delete('/comment/:comment_id/:patient_id', patientDelComment);
router.put('/comment', patientUpdateComment);


module.exports = router;