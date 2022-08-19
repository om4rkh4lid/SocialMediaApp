const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync');
const Tweets = require('../models/tweetModel');


exports.validateTweetExists = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.findById(req.params.id);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));

    req.tweet = tweet;

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
exports.deleteTweet = catchAsync(async (req, res, next) => {
    // make sure that the author of the tweet is the one deleting it
    const deletedByAuthor = req.tweet.author.toString() === req.user._id.toString()
    if (!deletedByAuthor) return next(new ApplicationError(403, 'Only the author of a tweet can delete it'));

    // await Tweets.findByIdAndDelete(req.tweet._id);
    const tweetId = req.tweet._id
    const deletion = await Tweets.deleteMany({ $or: [{ _id: tweetId }, { isReplyTo: tweetId }, { isQuoteTo: tweetId }]});

    res.sendStatus;
})

// TODO: Get timeline of tweets
/**
 * My tweets
 * Tweets from people I follow
 * Likes, retweets, and quotes from people I follow
 */
exports.getTimeline  = catchAsync(async (req, res, next) => {

})