const mongoose = require("mongoose");

const quoteRetweetSchema = mongoose.Schema({
    on: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
        required: [true, 'A quote retweet must be associated with a Tweet']
    },
    by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A quote retweet must be associated with a User']
    },
    at: {
        type: Date,
        default: Date.now()
    }
})

const QuoteRetweet = mongoose.Model('QuoteRetweet', quoteRetweetSchema)

module.exports = QuoteRetweet