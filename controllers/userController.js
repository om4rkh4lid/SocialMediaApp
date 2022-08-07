const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel')

exports.searchUsers = catchAsync(async (req, res, next) => {
    const queryRegEx = new RegExp(`${req.query.q}`, 'i')
    const users = await User.find({ $or: [{ email: { $regex: queryRegEx }}, { name: { $regex: queryRegEx }}] })

    res.status(200).json({
        users
    })
})