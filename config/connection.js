// Import necessary modules from the 'mongoose' library.
const { connect, connection } = require('mongoose');

// Define the MongoDB connection string. This string specifies the
// address and port of the MongoDB server, as well as the database name.
const connectString = 'mongodb://127.0.0.1:27017/socialDB';

// Use the 'connect' function from the mongoose library to connect to the MongoDB
// server using the provided connection string.
connect(connectString);

// Export the 'connection' object to make it available for other parts of the
// application. 
module.exports = connection;

// This object represents the active connection to the MongoDB
// database and can be used to perform database operations.