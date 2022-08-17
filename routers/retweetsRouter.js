const retweetsController = require('../controllers/retweetsController')
const retweetsRouter = require('express').Router({mergeParams: true})

retweetsRouter.route('/')
    .post(retweetsController.retweet)
    .get(retweetsController.getRetweets)
    .delete(retweetsController.unretweet)

module.exports = retweetsRouter;