import GenreMoviesRepository from './repositories/genreMoviesRepository.js';

class GenreMoviesModel {
  static async createGenreMovies(movieId, genreIds) {
    const result = await GenreMoviesRepository.createGenreMovies(movieId, genreIds);

    return result;
  }
}

export default GenreMoviesModel;
