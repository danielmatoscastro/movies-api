/* eslint-disable camelcase */
import RatingsModel from '../models/ratingsModel.js';
import { statusCodes } from '../constants.js';

class RatingsController {
  static async index(req, res) {
    const { movie_id } = req.query;

    const ratings = movie_id !== undefined
      ? await RatingsModel.listSelectedRatings(movie_id)
      : await RatingsModel.listRatings();

    return res.json(ratings);
  }

  static async store(req, res, next) {
    try {
      const rating = req.body;
      const result = await RatingsModel.createRating(rating);
      return res.status(statusCodes.CREATED).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default RatingsController;
