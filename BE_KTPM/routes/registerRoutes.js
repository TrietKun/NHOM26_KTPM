const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/class', registerController.getAllClass);
router.get('/class/:id', registerController.getClass);
router.post('/registerClass', registerController.registerClass);
router.post('/deleteClass', registerController.deleteClass);
router.post('/increaseStudent', registerController.increaseStudent);
router.post('/decreaseStudent', registerController.decreaseStudent);
router.post('/checkNumberCredit', registerController.checkNumberCredit);
router.post('/sendMail', registerController.sendMail);

module.exports = router;