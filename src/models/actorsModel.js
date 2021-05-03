import ActorsRepository from './repositories/actorsRepository.js';
import ActorSchema from './schemas/actorSchema.js';

class ActorsModel {
  static async findNamesByMovieId(id) {
    const names = await ActorsRepository.findNamesByMovieId(id);

    return names.map((name) => name.name);
  }

  static async createActorsIfNotExists(actorsNames) {
    const actors = actorsNames.map((name) => ({ name }));
    await Promise.all(actors.map((ac) => ActorSchema.validateAsync(ac)));

    return ActorsRepository.createActorsIfNotExists(actorsNames);
  }
}

export default ActorsModel;
