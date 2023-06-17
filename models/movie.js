const mongoose = require('mongoose');
const validator = require('validator');
const { urlRegex } = require('../utils/utils');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: 'Url is not correct.',
      },
    },
    trailerLink: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: 'Url is not correct.',
      },
    },
    thumbnail: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: 'Url is not correct.',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: Number,
      require: true,
    },
    nameEN: {
      type: Number,
      require: true,
    },
  },
);

module.exports = mongoose.model('movie', movieSchema);
