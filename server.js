const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

// Handle any uncaught exceptions related to the server
process.on('uncaughtException', err => {
    console.log('Uncaught Exception! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config();

// Database Connection
const DB = process.env.NODE_ENV === 'production' ? process.env.DB : process.env.TEST_DB
const connection = mongoose.connect(DB).then(() => {
    console.log(`Connected to database in ${process.env.NODE_ENV} mode...`);
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

// Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

