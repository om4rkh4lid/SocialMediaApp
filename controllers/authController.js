const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

const signToken = userId => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.protect = catchAsync(async (req, res, next) => {
    // make sure token is in the headers
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) return next(new ApplicationError(401, "You need to be logged in to perform this action"))
    const token = req.headers.authorization.split(' ')[1];

    // make sure token is valid
    const asyncVerify = promisify(jwt.verify);
    const decodedToken = await asyncVerify(token, process.env.JWT_SECRET);

    // make sure a user exists for this ID
    const user = await User.findById(decodedToken.id).select('+passwordLastChangedAt');
    if (!user) return next(new ApplicationError(401, "Please log in using a valid account!"))
    
    // check if password has changed since the token was issued
    if (user.changedPasswordAfter(decodedToken.iat)) return next(new ApplicationError(401, "Please log in again to access this feature."))

    req.user = user;

    next();
});

exports.login = catchAsync(async (req, res, next) => {

    if (!req.body.email || !req.body.password) return next(new ApplicationError(401, "You need to provide both an email and password to log in."));

    const user = await User.findOne({ email: req.body.email }).select('+password')
    // User exists and password is correct
    if (!user || !(await user.verifyPassword(req.body.password))) return next(new ApplicationError(401, "Incorrect email or password"))

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