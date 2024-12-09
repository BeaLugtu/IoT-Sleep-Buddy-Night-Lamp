// /routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registrationController');

// Registration route
router.post('/register', registerUser);

module.exports = router;
