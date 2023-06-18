const express = require('express');
const {
  getUsers, userProfileUpdate, getCurrentUser, getUserById,
} = require('../controllers/users');
const {
  userProfileUpdateValidation,
  getUserByIdValidation,
} = require('../middlewares/validator');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', getUserByIdValidation, getUserById);

userRouter.patch('/me', userProfileUpdateValidation, userProfileUpdate);

module.exports = userRouter;
