const quotesController = require('../controllers/quotesController')
const tweetsController = require('../controllers/tweetsController')
const quotesRouter = require('express').Router({ mergeParams: true });

quotesRouter.use(tweetsController.validateTweetExists);

quotesRouter
    .route('/')
    .post(quotesController.addQuote)
    .get(quotesController.getQuotes)

quotesRouter
    .route('/:quoteId')
    .delete(quotesController.removeQuote)


module.exports = quotesRouter;