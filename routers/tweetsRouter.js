const auth = require('../controllers/authController');
const express = require('express')
const likesRouter = require('./likesRouter')
const repliesRouter = require('./repliesRouter')
const quotesRouter = require('./quotesRouter')
const tweetsController = require('../controllers/tweetsController');

const tweetsRouter = express.Router();

tweetsRouter.use(auth.protect);

// create a tweet - POST /tweets
tweetsRouter.post('/', tweetsController.createTweet);
tweetsRouter.use('/:id/likes', likesRouter)
// TODO: tweetsRouter.use('/:id/retweets', retweetsRouter)
tweetsRouter.use('/:id/replies', repliesRouter)
TODO: tweetsRouter.use('/:id/quotes', quotesRouter)

// TODO: show feed of tweets (from people you follow) - GET /tweets


module.exports = tweetsRouter;