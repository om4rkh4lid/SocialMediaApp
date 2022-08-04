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
    at: {
        type: Date,
        default: Date.now()
    }
})

const Like = mongoose.Model('Like', likeSchema)

module.exports = Like