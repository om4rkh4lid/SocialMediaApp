const mongoose = require('mongoose');
const ApplicationError = require('../utils/ApplicationError');

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
    isReplyTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
    },
    isQuoteTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet'
    },
    __v: {
        type: Number,
        select: false
    }
})

// Make sure that a tweet is not BOTH a reply and a quote
tweetSchema.pre('save', function(next){
    if (this.isQuoteTo && this.isReplyTo) return next(new ApplicationError(400, 'A tweet can\'t be both a reply and a quote'));
    next();
})

tweetSchema.post('deleteMany', async function(docs, next){
    const id = this._conditions['$or'][0]._id;
    await mongoose.model('Like').deleteMany({ on: id })
    await mongoose.model('Retweet').deleteMany({ on: id })
    next();
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet