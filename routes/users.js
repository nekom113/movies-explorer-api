const express = require('express');
const {
  userProfileUpdate, getCurrentUser,
} = require('../controllers/users');
const {
  userProfileUpdateValidation,
} = require('../middlewares/validator');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', userProfileUpdateValidation, userProfileUpdate);

module.exports = userRouter;
