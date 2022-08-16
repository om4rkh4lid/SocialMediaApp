const Tweets = require('../models/tweetModel');
const catchAsync = require('../utils/catchAsync')

exports.addReply = catchAsync(async (req, res, next) => {
    const reply = await Tweets.create({
        content: req.body.content,
        author: req.user._id,
        isReplyTo: req.params.id
    });
    res.status(200).json(reply);
});

exports.removeReply = catchAsync(async (req, res, next) => {

});

exports.getReplies = catchAsync(async (req, res, next) => {

});