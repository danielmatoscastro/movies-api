import ActorsMoviesRepository from './repositories/actorsMoviesRepository.js';

class ActorsMoviesModel {
  static async createActorsMovies(movieId, actorsIds) {
    const result = await ActorsMoviesRepository.createActorsMovies(movieId, actorsIds);
    return result;
  }
}

export default ActorsMoviesModel;
