// db.js
const { Client } = require('pg');

// Create a new client instance with connection parameters
const client = new Client({
  host: 'localhost', // Use your database host
  port: 5432, // Default port for PostgreSQL
  user: 'xine', // The username you created
  password: 'xine', // The password you created
  database: 'iot' // The database you created
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;