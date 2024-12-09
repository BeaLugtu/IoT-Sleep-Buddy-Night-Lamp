// index.js
const express = require('express');
const dotenv = require('dotenv');
const registrationRoutes = require('./routes/registrationRoute');
const loginRoutes = require('./routes/loginRoute');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the registration routes
app.use('/api/auth', registrationRoutes);
app.use('/api/auth', loginRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
