const express = require('express');
const NotFoundError = require('../utils/error_types/notFoundError');
const { NOT_FOUND_ERROR_CODE } = require('../utils/status_codes');
const { loginValidation, createUserProfileValidation } = require('../middlewares/validator');
const { createUserProfile, login } = require('../controllers/users');

const router = express.Router();
router.use(express.json());

router.post(
  '/signin',
  loginValidation,
  login,
);
router.post(
  '/signup',
  createUserProfileValidation,
  createUserProfile,
);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.pageIsNotFound));
});
module.exports = router;
