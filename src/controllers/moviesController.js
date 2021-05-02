import MoviesModel from '../models/moviesModel.js';

class MoviesController {
  static async index(req, res) {
    const movies = await MoviesModel.listMovies();

    return res.json(movies);
  }
}

export default MoviesController;
