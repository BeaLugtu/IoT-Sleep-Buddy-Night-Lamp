const express = require('express');
const lightController = require('../controllers/lightController');

const router = express.Router();

router.post('/turnLightOn', lightController.turnLightOn);
router.post('/turnLightOff', lightController.turnLightOff);
router.post('/setColor', lightController.setColor);
router.post('/setBrightness', lightController.setBrightness);
router.post('/setSchedule', lightController.setSchedule);
router.get('/status', lightController.getStatus);
router.post('/setMode', lightController.setMode);

module.exports = router;
