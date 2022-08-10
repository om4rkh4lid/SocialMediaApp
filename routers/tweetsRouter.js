const auth = require('../controllers/authController');
const express = require('express')
const likesRouter = require('./likesRouter')
const tweetsController = require('../controllers/tweetsController');

const tweetsRouter = express.Router();

tweetsRouter.use(auth.protect);

// create a tweet - POST /tweets
tweetsRouter.post('/', tweetsController.createTweet);

// TODO: show feed of tweets (from people you follow) - GET /tweets

tweetsRouter.use('/:id/likes', likesRouter)
// TODO: reply to a tweet - POST /tweets/:id/replies

// TODO: quote a tweet - POST /tweets/:id/quote

// TODO: retweet a tweet - POST /tweets/:id/retweets


module.exports = tweetsRouter;