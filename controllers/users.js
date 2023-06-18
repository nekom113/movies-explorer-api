const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_CREATED,
  BAD_REQUEST_CODE,
  DUPLICATE_DATA_ERROR_CODE,
  STATUS_CODE_OK,
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require('../utils/status_codes');
const BadRequestError = require('../utils/error_types/badRequestError');
const DuplicateDataError = require('../utils/error_types/duplicateError');
const NotFoundError = require('../utils/error_types/notFoundError');
const UnauthorizedError = require('../utils/error_types/unauthorizedError');

const createUserProfile = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 8).then((hash) => User.create({
    name,
    email,
    password: hash,
  })).then((user) => {
    const newUserProfile = user.toObject();
    delete newUserProfile.password;
    return res.status(STATUS_CODE_CREATED.code).send(newUserProfile);
  })
    .catch((err) => {
      console.log({ err });
      if (err.name === 'ValidationError') {
        return new BadRequestError(BAD_REQUEST_CODE.message);
      }
      if (err.code === 11000) {
        return next(new DuplicateDataError(DUPLICATE_DATA_ERROR_CODE.message));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(
          new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.messages.incorrectEmailOrPassword),
        );
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(
              new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.messages.incorrectEmailOrPassword),
            );
          }
          const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
          return res.status(STATUS_CODE_OK.code).send({ token });
        });
    })
    .catch(next);
};


module.exports = {
  createUserProfile, login,
};
