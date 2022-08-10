const auth = require('../controllers/authController');
const followersRouter = require('../routers/followersRouter');
const { getFollowing } = require('../controllers/followersController');
const User = require('../models/userModel');
const userController = require('../controllers/userController');

const usersRouter = require('express').Router();

usersRouter.use(auth.protect);

usersRouter.use('/:id/followers', followersRouter)
usersRouter.use('/:id/following', getFollowing)

// search for a user using their name or email - GET /users?q=
usersRouter.get('/', userController.searchUsers);





module.exports = usersRouter;