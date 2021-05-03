import ActorsMoviesRepository from './repositories/actorsMoviesRepository.js';

class ActorsMoviesModel {
  static async createActorsMovies(movieId, actorsIds) {
    const result = await ActorsMoviesRepository.createActorsMovies(movieId, actorsIds);
    return result;
  }

  static async updateActorsMovies(movieId, actorsIds) {
    const result = await ActorsMoviesRepository.updateActorsMovies(movieId, actorsIds);
    return result;
  }
}

export default ActorsMoviesModel;
