const bcrypt = require('bcrypt');
const db = require('../config/db'); // MySQL database connection

async function registerUser(req, res) {
  const { email, username, password } = req.body; // Removed confirmPassword

  // Check if email or username already exists
  try {
    // Check if email exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, emailResults) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (emailResults.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Check if username exists
      db.query('SELECT * FROM users WHERE username = ?', [username], async (err, usernameResults) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (usernameResults.length > 0) {
          return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        db.query(
          'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
          [email, username, hashedPassword],
          (err, result) => {
            if (err) {
              console.error('Error inserting user:', err);
              return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'User created successfully', user: { id: result.insertId, email, username } });
          }
        );
      });
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerUser };
