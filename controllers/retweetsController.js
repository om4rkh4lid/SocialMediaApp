const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync')
const Retweets = require('../models/retweetModel');

// retweet a tweet - POST /tweets/:id/retweets
exports.retweet = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    const retweet = await Retweets.create({ on: tweetId, by: req.user._id });

    res.status(201).json(retweet);
});

// unretweet a tweet - DELETE /tweets/:id/retweets
exports.unretweet = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    const status = await Retweets.deleteOne({ $and: [{ on: tweetId }, { by: req.user._id }] });

    if (status.deletedCount === 0) return next(new ApplicationError(404, 'You can\'t unretweet a tweet you didn\'t retweet'));

    res.sendStatus(204)
});

// get tweet retweets - GET /tweets/:id/retweetss
exports.getRetweets = catchAsync(async (req, res, next) => {
    const tweetId = req.params.id;

    const retweets = (await Retweets.find({ on: tweetId }).select('by -_id').populate('by')).map(element => element.by);

    res.status(200).json({
        retweets
    })
});
