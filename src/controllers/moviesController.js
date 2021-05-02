import MoviesModel from '../models/moviesModel.js';

class MoviesController {
  static async index(req, res) {
    const movies = await MoviesModel.listMovies();

    return res.json(movies);
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await MoviesModel.findMovie(id);
      return res.json(movie);
    } catch (err) {
      return next(err);
    }
  }
}

export default MoviesController;
