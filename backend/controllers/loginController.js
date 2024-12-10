require('dotenv').config();  // Ensure this is at the top of your entry file

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Database connection

// Handle login requests
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database for the user by username
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return an error
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Ensure the secret key is available
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined in the environment variables' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the success response with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
