import RatingsModel from '../models/ratingsModel.js';

class RatingsController {
  static async index(req, res) {
    const ratings = await RatingsModel.listRatings();
    return res.json(ratings);
  }
}

export default RatingsController;
