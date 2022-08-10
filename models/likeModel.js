const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    on: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
        required: [true, 'A like must be associated with a Tweet']
    },
    by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A like must be associated with a User']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// make sure that a like isn't duplicated and better lookups
likeSchema.index({on: 1, by: 1}, {unique: true})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like