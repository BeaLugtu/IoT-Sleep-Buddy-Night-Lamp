const mysql = require('mysql2');

// Create a new connection instance with MySQL parameters
const connection = mysql.createConnection({
  host: 'localhost', // Use your MySQL database host
  user: 'root', // Replace with your MySQL username (default is 'root')
  password: '', // Replace with your MySQL password (default is blank for phpMyAdmin)
  database: 'smartglow' // Replace with the MySQL database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
