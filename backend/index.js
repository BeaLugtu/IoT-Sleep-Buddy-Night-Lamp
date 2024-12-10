// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const registrationRoutes = require('./routes/registrationRoute');
const loginRoutes = require('./routes/loginRoute');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend's domain/port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/auth', registrationRoutes);
app.use('/api/auth', loginRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});