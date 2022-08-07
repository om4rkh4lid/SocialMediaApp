const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
    on: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
        required: [true, 'A reply must be associated with a Tweet']
    },
    on: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
        required: [true, 'A quote retweet must be associated with a Tweet']
    },
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
        ref: 'Reply'
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
        ref: 'QuoteRetweet'
    }]
})

const Reply = mongoose.Model('Reply', replySchema)

module.exports = Reply