const express = require('express');
const router = express.Router();
const lightActivityController = require('../controllers/lightActivityController');

// Route for turning the light on in manual mode
router.post('/turnLightOn', lightActivityController.turnLightOn);

// Route for updating the color in manual mode
router.put('/updateColor', lightActivityController.updateColor);

// Route for turning the light off and calculating the duration in manual mode
router.put('/turnLightOff', lightActivityController.turnLightOff);

module.exports = router;
