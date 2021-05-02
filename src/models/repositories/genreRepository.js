import knex from '../../connection.js';

class GenreRepository {
  static findNamesByMovieId(id) {
    return knex('genre')
      .join('genre_movies', { 'genre_movies.genre_id': 'genre.genre_id' })
      .select('genre.name')
      .where({ 'genre_movies.movie_id': id });
  }
}

export default GenreRepository;
