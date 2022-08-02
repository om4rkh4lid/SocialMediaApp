const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = userId => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.login = catchAsync(async (req, res, next) => {

    // TODO: Send token to the user

    res.status(200).json({
        message: 'successfully logged in'
    })
})

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)

    user.password = undefined;

    const token = signToken(user._id);

    res.status(201).json({
        token,
        data: {
            user
        }
    })
});