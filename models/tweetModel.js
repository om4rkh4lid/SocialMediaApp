const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'You can\'t create an empty tweet'],
        maxlength: [280, 'The max length of a tweet is 280 characters'],
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Your tweet must have an author']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    replies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet'
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    }],
    retweets: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Retweet'
    }],
    quoteRetweets: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Retweet'
    }]
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet