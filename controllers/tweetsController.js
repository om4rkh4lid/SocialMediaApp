const catchAsync = require('../utils/catchAsync');
const Tweet = require('../models/tweetModel');

exports.createTweet = catchAsync(async (req, res, next) => {
    const tweet = await Tweet.create({
        content: req.body.content,
        author: req.user._id
    });

    res.status(200).json(tweet);
    
});
