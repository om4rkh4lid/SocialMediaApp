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
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

retweetSchema.index({on: 1, by: 1}, {unique: true})

const Retweet = mongoose.model('Retweet', retweetSchema)

module.exports = Retweet