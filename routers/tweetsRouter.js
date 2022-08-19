const auth = require('../controllers/authController');
const express = require('express')
const likesRouter = require('./likesRouter')
const quotesRouter = require('./quotesRouter')
const repliesRouter = require('./repliesRouter')
const retweetsRouter = require('./retweetsRouter')
const tweetsController = require('../controllers/tweetsController');

const tweetsRouter = express.Router();

tweetsRouter.use(auth.protect);

// create a tweet - POST /tweets
tweetsRouter.post('/', tweetsController.createTweet);
tweetsRouter.get('/', tweetsController.getTimeline);
tweetsRouter.delete('/:id', tweetsController.validateTweetExists, tweetsController.deleteTweet);
tweetsRouter.use('/:id/likes', likesRouter)
tweetsRouter.use('/:id/retweets', retweetsRouter)
tweetsRouter.use('/:id/replies', repliesRouter)
tweetsRouter.use('/:id/quotes', quotesRouter)




module.exports = tweetsRouter;