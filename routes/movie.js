const express = require('express');
const { createMovie, getMovieListOfUser, deleteUsersMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validator');

const movieRouter = express.Router();

movieRouter.use(express.json());

movieRouter.get('/', getMovieListOfUser);

movieRouter.post(
  '/',
  createMovieValidation,
  createMovie,
);
movieRouter.delete(
  '/:movieId',
  deleteMovieValidation,
  deleteUsersMovie,
);

module.exports = movieRouter;
