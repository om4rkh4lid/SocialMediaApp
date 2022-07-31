const dotenv = require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

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


