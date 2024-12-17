const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Your database connection

// Generate email verification token
function generateEmailVerificationToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration
}

// Send verification email
function sendVerificationEmail(userEmail, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email_User, // Your email user
      pass: process.env.Email_Pass, // Your email password
    },
  });

console.log('Email_User:', process.env.Email_User);
console.log('Email_Pass:', process.env.Email_Pass);


  const mailOptions = {
    from: process.env.Email_User,
    to: userEmail,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the link: 
    http://localhost:5173/verify-email?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Verify email token
function verifyEmailToken(token, res) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const userId = decoded.userId;
  
      // Update user verification status in the database
      db.query('UPDATE users SET verified = 1 WHERE id = ?', [userId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error verifying email' });
        }
  
        // Send back a success message
        res.status(200).json({
          message: 'Email verified successfully! Please login to continue.',
          redirect: '/login', // Add this to guide the frontend for redirection
        });
      });
    });
  }

module.exports = { generateEmailVerificationToken, sendVerificationEmail, verifyEmailToken };