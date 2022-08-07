const express = require('express')
const auth = require('../controllers/authController');
const tweetsController = require('../controllers/tweetsController');

const tweetsRouter = express.Router();

tweetsRouter.use(auth.protect);

// create a tweet - POST /tweets
tweetsRouter.post('/', tweetsController.createTweet);

// TODO: show feed of tweets (from people you follow) - GET /tweets

// TODO: like a tweet - POST /tweets/:id/likes

// TODO: reply to a tweet - POST /tweets/:id/replies

// TODO: quote a tweet - POST /tweets/:id/quote

// TODO: retweet a tweet - POST /tweets/:id/retweets


module.exports = tweetsRouter;