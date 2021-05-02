import GenreRepository from './repositories/genreRepository.js';

class GenreModel {
  static async findNamesByMovieId(id) {
    const names = await GenreRepository.findNamesByMovieId(id);

    return names.map((name) => name.name);
  }
}

export default GenreModel;
