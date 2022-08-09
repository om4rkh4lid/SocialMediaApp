const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    followed: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Follower = new mongoose.model('Follower', followerSchema);

module.exports = Follower;

