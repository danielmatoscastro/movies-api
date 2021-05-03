import knex from '../../connection.js';

class GenreMoviesRepository {
  static async createGenreMovies(movieId, genreIds) {
    const genreMovies = genreIds.map((ac) => ({ movie_id: movieId, genre_id: ac }));
    return knex('genre_movies').insert(genreMovies, '*');
  }
}

export default GenreMoviesRepository;
