const auth = require('../controllers/authController');
const User = require('../models/userModel');
const userController = require('../controllers/userController');

const usersRouter = require('express').Router();

usersRouter.use(auth.protect);

// search for a user using their name or email - GET /users?q=
usersRouter.get('/', userController.searchUsers);

// TODO: follow a user - POST /users/:id/followers
// TODO: unfollow a user - DELETE /users/:id/followers


module.exports = usersRouter;