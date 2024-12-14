const express = require('express');
const router = express.Router();
const lightActivityController = require('../controllers/lightActivityController');

// Route to insert a light activity (manual or automatic)
router.post('/addActivity', (req, res) => {
  const { userId, lightOnTime, lightOffTime, duration, color, mode } = req.body;

  // Validation
  if (!userId || !lightOnTime || !lightOffTime || !duration || !color || !mode) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Ensure color is an object and has r, g, b properties
  if (typeof color !== 'object' || color === null || !('r' in color) || !('g' in color) || !('b' in color)) {
    return res.status(400).json({ error: "Color must be an object with 'r', 'g', and 'b' properties." });
  }

  const { r, g, b } = color;
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return res.status(400).json({ error: "Each RGB value must be between 0 and 255." });
  }

  // Call the controller to insert the activity
  lightActivityController.insertActivity(userId, lightOnTime, lightOffTime, duration, color, mode);

  res.status(200).send('Activity saved.');
});

// Route to get active light activities for a user
router.get('/viewActivity/:userId', (req, res) => {
  const userId = req.params.userId;

  lightActivityController.getActiveActivities(userId, (result) => {
    res.status(200).json(result);
  });
});

// Route to get archived light activities for a user
router.get('/viewActivity/archived/:userId', (req, res) => {
  const userId = req.params.userId;

  lightActivityController.getArchivedActivities(userId, (result) => {
    res.status(200).json(result);
  });
});

// Route to archive an activity (mark it as archived)
router.post('/addActivity/archive/:userId/:activityId', (req, res) => {
  const { userId, activityId } = req.params;

  lightActivityController.archiveActivity(userId, activityId);
  res.status(200).send('Activity archived.');
});

// Route to delete a light activity permanently
router.delete('/deleteActivity/:userId/:activityId', (req, res) => {
  const { userId, activityId } = req.params;

  lightActivityController.deleteActivity(userId, activityId);
  res.status(200).send('Activity deleted.');
});

module.exports = router;
