const repliesController = require('../controllers/repliesController')
const repliesRouter = require('express').Router({ mergeParams: true });

repliesRouter
    .route('/')
    .post(repliesController.addReply)
    .get(repliesController.getReplies)

repliesRouter
    .route('/:replyId')
    .delete(repliesController.removeReply)


module.exports = repliesRouter;