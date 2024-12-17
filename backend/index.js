// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const connection = require('./config/db'); // Assuming connection.js is your DB connection file

// Routes
const registrationRoutes = require('./routes/registrationRoute');
const loginRoutes = require('./routes/loginRoute');
const lightActivityRoutes = require('./routes/lightActivityRoute');
const lightRoutes = require('./routes/lightRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Session middleware must be used before passport initialization
app.use(
  session({
    secret: "secret", // Secret key for the session
    resave: false,     // Don't resave session if unmodified
    saveUninitialized: true // Save a session that is new, but not modified
  })
);

app.use(passport.initialize());  // Initialize Passport
app.use(passport.session());     // Use passport sessions
app.use(express.json());
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend's domain/port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const selectQuery = 'SELECT * FROM users WHERE google_id = ?';
    connection.query(selectQuery, [profile.id], async (err, results) => {
      if (err) return done(err);

      let user = results[0];
      if (!user) {
        const insertQuery = 'INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)';
        const userData = [
          profile.displayName,
          profile.emails[0].value,
          profile.id,
          null
        ];

        connection.query(insertQuery, userData, (err, result) => {
          if (err) return done(err);
          user = { id: result.insertId, ...userData };
          return done(null, user);
        });
      } else {
        return done(null, user);
      }
    });
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: true }), (req, res) => {
  res.redirect('http://localhost:5173/dashboard');
});

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:5173/');
});

app.use('/api/auth', registrationRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/auth', lightActivityRoutes);
app.use('/api/light', lightRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






// --------------------------------------------------------- //

