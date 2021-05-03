import createError from 'http-errors';
import MoviesRepository from './repositories/moviesRepository.js';
import MovieSchema from './schemas/movieSchema.js';
import ActorsModel from './actorsModel.js';
import GenreModel from './genreModel.js';
import RatingsModel from './ratingsModel.js';
import ActorsMoviesModel from './actorsMoviesModel.js';
import GenreMoviesModel from './genreMoviesModel.js';

const UNIQUE_VIOLATION = '23505';

class MoviesModel {
  static async listMovies() {
    return MoviesRepository.find();
  }

  static async listSelectedMovies(ids) {
    return MoviesRepository.findSelectedMovies(ids);
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

  static async createMovie(movie) {
    const newMovie = { ...movie };

    try {
      await MovieSchema.validateAsync(newMovie);
    } catch (err) {
      throw new createError.BadRequest(err.details[0].message);
    }

    const { actors, genre } = newMovie;

    delete newMovie.movie_id;
    delete newMovie.actors;
    delete newMovie.genre;

    let result;
    try {
      [result] = await MoviesRepository.createMovie(newMovie);
    } catch (err) {
      if (err.code === UNIQUE_VIOLATION) {
        throw new createError.Conflict('movie already exists');
      }
    }

    const [newActors, newGenre] = await Promise.all([
      ActorsModel.createActorsIfNotExists(actors),
      GenreModel.createGenreIfNotExists(genre),
    ]);

    const actorsIds = newActors.map((ac) => ac.actor_id);
    const genreIds = newGenre.map((ge) => ge.genre_id);

    await Promise.all([
      ActorsMoviesModel.createActorsMovies(result.movie_id, actorsIds),
      GenreMoviesModel.createGenreMovies(result.movie_id, genreIds),
    ]);

    return {
      ...result,
      actors,
      genre,
      ratings_ids: [],
    };
  }

  static async updateMovie(id, movie) {
    const { actors, genre } = movie;

    const movieDB = await MoviesRepository.findById(id);
    const newMovie = {
      ...movieDB,
      ...movie,
      actors: movie.actors || [],
      genre: movie.genre || [],
    };

    try {
      await MovieSchema.validateAsync(newMovie);
    } catch (err) {
      throw new createError.BadRequest(err.details[0].message);
    }

    delete newMovie.movie_id;
    delete newMovie.actors;
    delete newMovie.genre;
    delete newMovie.ratings_ids;

    await MoviesRepository.updateMovie(id, newMovie);
    const [newActors, newGenre] = await Promise.all([
      ActorsModel.createActorsIfNotExists(actors),
      GenreModel.createGenreIfNotExists(genre),
    ]);

    const actorsIds = newActors.map((ac) => ac.actor_id);
    const genreIds = newGenre.map((ge) => ge.genre_id);

    await Promise.all([
      ActorsMoviesModel.updateActorsMovies(id, actorsIds),
      GenreMoviesModel.updateGenreMovies(id, genreIds),
    ]);
  }

  static async deleteMovie(id) {
    const rows = await MoviesRepository.deleteMovie(id);
    if (rows === 0) {
      throw new createError.NotFound('movie not found');
    }
  }
}

export default MoviesModel;
