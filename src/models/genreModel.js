import GenreRepository from './repositories/genreRepository.js';
import GenreSchema from './schemas/genreSchema.js';

class GenreModel {
  static async findNamesByMovieId(id) {
    const names = await GenreRepository.findNamesByMovieId(id);

    return names.map((name) => name.name);
  }

  static async createGenreIfNotExists(genreNames) {
    const genre = genreNames.map((name) => ({ name }));
    await Promise.all(genre.map((ac) => GenreSchema.validateAsync(ac)));

    return GenreRepository.createGenreIfNotExists(genreNames);
  }
}

export default GenreModel;
