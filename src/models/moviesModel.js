import MoviesRepository from './repositories/moviesRepository.js';

class MoviesModel {
  static async listMovies() {
    return MoviesRepository.find();
  }
}

export default MoviesModel;
