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
}

export default MoviesRepository;
