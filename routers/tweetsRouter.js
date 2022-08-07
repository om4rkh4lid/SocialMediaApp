const express = require('express')
const auth = require('../controllers/authController');
const tweetsController = require('../controllers/tweetsController');

const tweetsRouter = express.Router();

tweetsRouter.use(auth.protect);

// create a tweet - POST /tweets
tweetsRouter.post('/', tweetsController.createTweet);


// like a tweet - POST /tweets/:id/likes
// reply to a tweet - POST /tweets/:id/replies
// quote a tweet - POST /tweets/:id/quote
// retweet a tweet - POST /tweets/:id/retweets


module.exports = tweetsRouter;