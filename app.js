const auth = require('./controllers/authController')
const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

// Development Logging
app.use(morgan('dev'))

// Parse request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* App routes */
app.post('/signup', auth.signup);
app.post('/login', auth.login);

app.get('/test', auth.protect, (req, res) => {
    res.status(201).json({
        message: 'Success'
    })
})

// Global error handler
app.use(globalErrorHandler);


module.exports = app;