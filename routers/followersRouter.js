const followersController = require('../controllers/followersController');

// Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
const followersRouter = require('express').Router({ mergeParams: true })

followersRouter
    .route('/')
    .get(followersController.getFollowers)
    .post(followersController.follow)
    .delete(followersController.unfollow)

module.exports = followersRouter;