const quotesController = require('../controllers/quotesController')
const quotesRouter = require('express').Router({ mergeParams: true });

quotesRouter.use(quotesController.validateTweetExists);

quotesRouter
    .route('/')
    .post(quotesController.addQuote)
    .get(quotesController.getQuotes)

quotesRouter
    .route('/:quoteId')
    .delete(quotesController.removeQuote)


module.exports = quotesRouter;