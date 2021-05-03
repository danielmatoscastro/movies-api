import createError from 'http-errors';
import RatingsRepository from './repositories/ratingsRepository.js';
import RatingSchema from './schemas/ratingSchema.js';

const UNIQUE_VIOLATION = '23505';
const FOREIGN_KEY_VIOLATION = '23503';

class RatingsModel {
  static async findIdsByMovieId(id) {
    const ids = await RatingsRepository.findIdsByMovieId(id);

    return ids.map((ratingId) => ratingId.rating_id);
  }

  static async listRatings() {
    return RatingsRepository.listRatings();
  }

  static async createRating(rating) {
    const newRating = { ...rating };
    try {
      await RatingSchema.validateAsync(newRating);
    } catch (err) {
      throw new createError.BadRequest(err.details[0].message);
    }

    delete newRating.rating_id;

    let result;
    try {
      [result] = await RatingsRepository.createRating(newRating);
    } catch (err) {
      if (err.code === UNIQUE_VIOLATION) {
        throw new createError.Conflict('rating already exists');
      } else if (err.code === FOREIGN_KEY_VIOLATION) {
        throw new createError.NotFound('movie not found');
      }

      throw err;
    }

    return result;
  }

  static async listSelectedRatings(movieId) {
    return RatingsRepository.listSelectedRatings(movieId);
  }
}

export default RatingsModel;
