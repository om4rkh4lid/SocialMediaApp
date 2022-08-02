const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const ApplicationError = require('../utils/ApplicationError');

const signToken = userId => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.login = catchAsync(async (req, res, next) => {

    if (!req.body.email || !req.body.password) return next(ApplicationError(401, "You need to provide both an email and password to log in."));

    const user = await User.findOne({ email: req.body.email }).select('+password')
    // User exists and password is correct
    if (!user || !(await user.verifyPassword(req.body.password))) return next(ApplicationError(401, "Incorrect email or password"))

    const token = signToken(user._id);

    user.password = undefined;

    res.status(202).json({
        token,
        data: {
            user
        }
    })
})

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    const token = signToken(user._id);
    
    user.password = undefined;

    res.status(201).json({
        token,
        data: {
            user
        }
    })
});