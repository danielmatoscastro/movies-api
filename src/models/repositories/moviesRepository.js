import knex from '../../connection.js';

class MoviesRepository {
  static find() {
    return knex('movies').select();
  }

  static findById(id) {
    return knex('movies')
      .select()
      .where({ movie_id: id })
      .first();
  }

  static findSelectedMovies(ids) {
    return knex('movies')
      .select()
      .whereIn('movie_id', ids);
  }

  static createMovie(movie) {
    return knex('movies').insert(movie, '*');
  }

  static updateMovie(id, movie) {
    return knex('movies').update(movie).where({ movie_id: id });
  }

  static deleteMovie(id) {
    return knex('movies').delete().where({ movie_id: id });
  }
}

export default MoviesRepository;
