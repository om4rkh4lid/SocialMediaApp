const ApplicationError = require('../utils/ApplicationError');
const catchAsync = require('../utils/catchAsync');
const Tweets = require('../models/tweetModel');
const Likes = require('../models/likeModel');
const Retweets = require('../models/retweetModel');
const Followers = require('../models/followerModel');


exports.validateTweetExists = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.findById(req.params.id);
    if (!tweet) return next(new ApplicationError(404, 'This tweet doesn\'t exist'));

    req.tweet = tweet;

    next();
})

exports.createTweet = catchAsync(async (req, res, next) => {
    const tweet = await Tweets.create({
        content: req.body.content,
        author: req.user._id,
        createdAt: Date.now()
    });

    res.status(200).json(tweet);

});


exports.deleteTweet = catchAsync(async (req, res, next) => {
    // make sure that the author of the tweet is the one deleting it
    const deletedByAuthor = req.tweet.author.toString() === req.user._id.toString()
    if (!deletedByAuthor) return next(new ApplicationError(403, 'Only the author of a tweet can delete it'));

    // await Tweets.findByIdAndDelete(req.tweet._id);
    const tweetId = req.tweet._id
    const deletion = await Tweets.deleteMany({ $or: [{ _id: tweetId }, { isReplyTo: tweetId }, { isQuoteTo: tweetId }] });

    res.sendStatus(204);
})

// TODO: Get timeline of tweets with pagination
/**
 * My tweets
 * Tweets from people I follow
 * Likes, retweets, and quotes from people I follow
 */
exports.getTimeline = catchAsync(async (req, res, next) => {
    const userId = req.user._id.toString()
    
    const peopleToShowTweetsFrom = (await Followers.find({ follower: userId })).map(element => element.followed.toString()); 

    const timeline = await Tweets.find({ author: {$in: [ ...peopleToShowTweetsFrom, userId ]} }).populate('author isReplyTo isQuoteTo');
    
    const likesByPeopleIFollow = await Likes.find({ by: {$in: [ ...peopleToShowTweetsFrom ]}}).populate('on by');
    const retweetsByPeopleIFollow = await Retweets.find({ by: {$in: [ ...peopleToShowTweetsFrom ]}}).populate('on by');

    timeline.push(...likesByPeopleIFollow.map(el => {
        return {
            likedTweet: el.on,
            likedBy: el.by,
            createdAt: el.createdAt
        }
    }))
    timeline.push(...retweetsByPeopleIFollow.map(el => {
        return {
            retweetedTweet: el.on,
            retweetedBy: el.by,
            createdAt: el.createdAt
        }
    }))


    timeline.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
    })
    
    res.status(200).json({
        timeline
    })

})