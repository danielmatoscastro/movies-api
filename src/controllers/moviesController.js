import MoviesModel from '../models/moviesModel.js';

class MoviesController {
  static async index(req, res) {
    const { id, rating } = req.query;

    const movies = (id || rating !== undefined)
      ? await MoviesModel.listSelectedMovies(id, rating !== undefined ? rating === 'true' : rating)
      : await MoviesModel.listMovies();

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

  static async store(req, res, next) {
    try {
      const movie = await MoviesModel.createMovie(req.body);
      return res.status(201).json(movie);
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      await MoviesModel.updateMovie(id, req.body);
      return res.sendStatus(204);
    } catch (err) {
      return next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      await MoviesModel.deleteMovie(id);
      return res.sendStatus(201);
    } catch (err) {
      return next(err);
    }
  }
}

export default MoviesController;
