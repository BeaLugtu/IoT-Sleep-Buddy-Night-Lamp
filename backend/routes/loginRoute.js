const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');  // Check the relative path

// POST /login - Handles user login
router.post('/login', loginController.login);

module.exports = router;
