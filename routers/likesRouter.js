const likesController = require('../controllers/likesController')
const tweetsController = require('../controllers/tweetsController')
const likesRouter = require('express').Router({mergeParams: true})

likesRouter.use(tweetsController.validateTweetExists)

likesRouter.route('/')
    .post(likesController.like)
    .get(likesController.getLikes)
    .delete(likesController.unlike)

module.exports = likesRouter;