const repliesController = require('../controllers/repliesController')
const tweetsController = require('../controllers/tweetsController')
const repliesRouter = require('express').Router({ mergeParams: true });

repliesRouter.use(tweetsController.validateTweetExists);

repliesRouter
    .route('/')
    .post(repliesController.addReply)
    .get(repliesController.getReplies)

repliesRouter
    .route('/:replyId')
    .delete(repliesController.removeReply)


module.exports = repliesRouter;