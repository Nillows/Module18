// Import necessary modules.
const express = require('express');
const db = require('./config/connection'); // Imports database configuration.
const routes = require('./controllers'); // Imports your defined routes.

// Define the port number to listen on, using the environment variable or default to 3000.
const PORT = process.env.PORT || 3000;

// Create an Express application.
const app = express();

// Parse incoming JSON and url-encoded data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes for handling incoming requests.
app.use(routes);

// Once the database connection is open, start the Express server.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});
