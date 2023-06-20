const Movie = require('../models/movie');
const BadRequestError = require('../utils/error_types/badRequestError');
const ForbiddenError = require('../utils/error_types/forbiddenError');
const NotFoundError = require('../utils/error_types/notFoundError');
const {
  BAD_REQUEST_CODE, STATUS_CODE_CREATED, STATUS_CODE_OK, NOT_FOUND_ERROR_CODE, FORBIDDEN_ERROR_CODE,
} = require('../utils/status_codes');

const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(STATUS_CODE_CREATED.code).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_CODE.message));
      }
      return next(err);
    });
};

const getMovieListOfUser = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(STATUS_CODE_OK.code)
        .send(movies);
    }).catch(next);
};

const deleteUsersMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.cardIsNotFound));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError(FORBIDDEN_ERROR_CODE.message));
      }
      return Movie.deleteOne(movie).then(
        res.status(STATUS_CODE_OK.code).send(movie),
      );
    });
};
module.exports = {
  createMovie, getMovieListOfUser, deleteUsersMovie,
};
