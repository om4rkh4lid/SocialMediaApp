const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync')
const Likes = require('../models/likeModel');
const Tweet = require('../models/tweetModel');

// TODO: Refactoring - add a middleware to make sure the tweet exists 

// like a tweet - POST /tweets/:id/likes
exports.like = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    // make sure tweet still exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'))

    const like = await Likes.create({ on: tweetId, by: req.user._id });

    res.sendStatus(201)
});

// unlike a tweet - DELETE /tweets/:id/likes
exports.unlike = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    // make sure tweet still exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));

    const status = await Likes.deleteOne({ $and: [{ on: tweetId }, { by: req.user._id }] });

    if (status.deletedCount === 0) return next(new ApplicationError(404, 'You can\'t unlike a tweet you didn\'t like'));

    res.sendStatus(204)
});

// get tweet likes - GET /tweets/:id/likess
exports.getLikes = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    // make sure tweet still exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));

    const likes = (await Likes.find({ on: tweetId }).select('by -_id').populate('by')).map(element => element.by);

    res.status(200).json({
        likes
    })
});
