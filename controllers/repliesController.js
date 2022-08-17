const Tweets = require('../models/tweetModel');
const ApplicationError = require('../utils/ApplicationError');
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
    await Tweets.findByIdAndDelete(req.params.replyId);
    res.sendStatus(204);
});

exports.getReplies = catchAsync(async (req, res, next) => {
    const replies = await Tweets.find({ isReplyTo: req.params.id }).populate('author');
    res.status(200).json({
        replies
    });
});