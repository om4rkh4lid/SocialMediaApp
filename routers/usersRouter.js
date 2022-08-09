const auth = require('../controllers/authController');
const followersController = require('../controllers/followersController');
const User = require('../models/userModel');
const userController = require('../controllers/userController');

const usersRouter = require('express').Router();

usersRouter.use(auth.protect);

// search for a user using their name or email - GET /users?q=
usersRouter.get('/', userController.searchUsers);

usersRouter
    .route('/:id/followers')
    .get(followersController.getFollowers)
    .post(followersController.follow)
    .delete(followersController.unfollow)



module.exports = usersRouter;