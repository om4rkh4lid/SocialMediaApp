const likesController = require('../controllers/likesController')
const likesRouter = require('express').Router({mergeParams: true})

likesRouter.route('/')
    .post(likesController.like)
    .get(likesController.getLikes)
    .delete(likesController.unlike)

module.exports = likesRouter;