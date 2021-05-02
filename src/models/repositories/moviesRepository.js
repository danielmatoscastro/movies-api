import knex from '../../connection.js';

class MoviesRepository {
  static find() {
    return knex('movies').select();
  }
}

export default MoviesRepository;
