const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'You must have a follower']
    },
    followed: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'You must follow someone']
    },
    __v: {
        type: Number,
        select: false
    }
});

// to ensure that you can only follow someone one time
followerSchema.index({ follower: 1, followed: 1 }, { unique: true });

const Follower = new mongoose.model('Follower', followerSchema);

module.exports = Follower;

