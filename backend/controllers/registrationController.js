const bcrypt = require('bcrypt');
const client = require('../config/db');

async function registerUser(req, res) {
  const { email, username, password } = req.body;  // Removed confirmPassword

  // Check if email or username already exists
  try {
    const emailExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const usernameExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const result = await client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, hashedPassword]);

    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerUser };
