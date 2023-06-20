const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/utils');

const idValidation = (value, helper) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  return helper.message('ID is not correct');
};

module.exports.createUserProfileValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .min(2)
        .max(30),
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .min(6),
    }),
});

module.exports.loginValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .min(6),
    }),
});

module.exports.getCurrentUserValidation = celebrate({
  params: Joi
    .object()
    .keys({
      userId: Joi
        .string()
        .custom(idValidation),
    }),
});

module.exports.userProfileUpdateValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      email: Joi
        .string()
        .email(),
    }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidation),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi
    .object()
    .keys({
      movieId: Joi
        .string()
        .required()
        .custom(idValidation),
    }),
});
