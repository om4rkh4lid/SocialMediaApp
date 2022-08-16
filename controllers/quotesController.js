const Tweets = require('../models/tweetModel');
const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync')

exports.validateTweetExists = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.findById(req.params.id);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));
    next();
})

exports.addQuote = catchAsync(async (req, res, next) => {
    const quote = await Tweets.create({
        content: req.body.content,
        author: req.user._id,
        isQuoteTo: req.params.id
    });
    res.status(200).json(quote);
});

exports.removeQuote = catchAsync(async (req, res, next) => {
    await Tweets.findByIdAndDelete(req.params.quoteId);
    res.sendStatus(204);
});

exports.getQuotes = catchAsync(async (req, res, next) => {
    const replies = await Tweets.find({ isQuoteTo: req.params.id }).populate('author');
    res.status(200).json({
        replies
    });
});