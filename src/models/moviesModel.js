import createError from 'http-errors';
import MoviesRepository from './repositories/moviesRepository.js';
import ActorsModel from './actorsModel.js';
import GenreModel from './genreModel.js';
import RatingsModel from './ratingsModel.js';

class MoviesModel {
  static async listMovies() {
    return MoviesRepository.find();
  }

  static async findMovie(id) {
    const [
      movie,
      actorsInMovie,
      genreOfMovie,
      ratingsOfMovie,
    ] = await Promise.all([
      MoviesRepository.findById(id),
      ActorsModel.findNamesByMovieId(id),
      GenreModel.findNamesByMovieId(id),
      RatingsModel.findIdsByMovieId(id),
    ]);

    if (!movie) {
      throw new createError.NotFound('movie not found');
    }

    return {
      ...movie,
      actors: actorsInMovie,
      genre: genreOfMovie,
      ratings_ids: ratingsOfMovie,
    };
  }
}

export default MoviesModel;
