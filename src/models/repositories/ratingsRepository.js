import knex from '../../connection.js';

class RatingsRepository {
  static findIdsByMovieId(id) {
    return knex('ratings')
      .select('rating_id')
      .where({ 'ratings.movie_id': id });
  }
}

export default RatingsRepository;
