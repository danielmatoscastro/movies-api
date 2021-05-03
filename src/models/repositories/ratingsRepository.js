import knex from '../../connection.js';

class RatingsRepository {
  static findIdsByMovieId(id) {
    return knex('ratings')
      .select('rating_id')
      .where({ 'ratings.movie_id': id });
  }

  static listRatings() {
    return knex('ratings').select();
  }

  static async createRating(newRating) {
    return knex('ratings').insert(newRating, '*');
  }

  static listSelectedRatings(movieId) {
    return knex('ratings').select().where({ movie_id: movieId });
  }
}

export default RatingsRepository;
