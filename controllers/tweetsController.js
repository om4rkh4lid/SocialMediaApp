const catchAsync = require('../utils/catchAsync');
const Tweets = require('../models/tweetModel');

exports.validateTweetExists = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.findById(req.params.id);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));
    next();
})

exports.createTweet = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.create({
        content: req.body.content,
        author: req.user._id
    });

    res.status(200).json(tweet);
    
});

// TODO: Delete a tweet and its replies, retweets, quotes, and likes