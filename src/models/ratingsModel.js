import RatingsRepository from './repositories/ratingsRepository.js';

class RatingsModel {
  static async findIdsByMovieId(id) {
    const ids = await RatingsRepository.findIdsByMovieId(id);

    return ids.map((ratingId) => ratingId.rating_id);
  }

  static async listRatings() {
    return RatingsRepository.listRatings();
  }
}

export default RatingsModel;
