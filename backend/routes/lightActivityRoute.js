const express = require('express');
const router = express.Router();
const lightActivityController = require('../controllers/lightActivityController');

// Route for turning the light on in manual mode
router.post('/turnLightOn', lightActivityController.turnLightOn);

// Route for automatically turning the light on
router.post('/autoTurnLightOn', lightActivityController.turnLightOnAutomatic);

// Route for updating the color in manual mode
router.put('/updateColor', lightActivityController.setColor);

// Route for turning the light off and calculating the duration in manual mode
router.put('/turnLightOff', lightActivityController.turnLightOff);

// Route for turning the light off in automatic mode
router.put('/autoTurnLightOff', lightActivityController.turnLightOffAutomatic);

// Route for getting the history of light activities
router.get('/history/:user_id', lightActivityController.getHistory);

// Route for getting the archived light activities of a user
router.get('/archived/:user_id', lightActivityController.getArchived);

// Route for archiving a light activity
router.put('/archiveActivity/:id', lightActivityController.archiveActivity);

// Route for unarchiving a light activity
router.put('/unarchiveActivity/:id', lightActivityController.unarchiveActivity);

module.exports = router;
