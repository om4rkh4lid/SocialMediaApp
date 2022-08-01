const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApplicationError = require('../utils/ApplicationError');

exports.login = catchAsync(async (req, res, next) => {
    res.status(200).json({
        message: 'successfully logged in'
    })
})

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    
    res.status(201).json({
        data: {
            user
        }
    })
});