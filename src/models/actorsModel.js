import ActorsRepository from './repositories/actorsRepository.js';

class ActorsModel {
  static async findNamesByMovieId(id) {
    const names = await ActorsRepository.findNamesByMovieId(id);

    return names.map((name) => name.name);
  }
}

export default ActorsModel;
