const mongoose = require("mongoose");

const retweetSchema = mongoose.Schema({
    on: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
        required: [true, 'A retweet must be associated with a Tweet']
    },
    by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A retweet must be associated with a User']
    },
    at: {
        type: Date,
        default: Date.now()
    }
})

const Retweet = mongoose.Model('Retweet', retweetSchema)

module.exports = Retweet