const catchAsync = require("../utils/catchAsync");
const Followers = require('../models/followerModel');
const ApplicationError = require("../utils/ApplicationError");
const User = require("../models/userModel");

exports.follow = catchAsync(async (req, res, next) => {
    const followedId = req.params.id

    if (followedId == req.user._id) return next(new ApplicationError(400, 'You can\'t follow yourself'));

    // make sure followedId exists
    const followedUser = await User.findById(followedId)

    if (!followedUser) return next(new ApplicationError(400, 'User doesn\'t exist'))

    await Followers.create({
        follower: req.user,
        followed: followedId
    });

    res.status(201).json({
        message: 'Successfully followed user.'
    })
});

exports.getFollowers = catchAsync(async (req, res, next) => {

});

exports.unfollow = catchAsync(async (req, res, next) => {
    const followedId = req.params.id

    const relation = await Followers.deleteOne({ $and : [{ follower: req.user, followed: followedId }] })

    if (relation.deletedCount == 0) return next(new ApplicationError(400, 'You can\'t unfollow someone you don\'t follow'));

    res.sendStatus(204)
});