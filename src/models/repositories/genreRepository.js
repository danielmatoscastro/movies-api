import knex from '../../connection.js';

class GenreRepository {
  static findNamesByMovieId(id) {
    return knex('genre')
      .join('genre_movies', { 'genre_movies.genre_id': 'genre.genre_id' })
      .select('genre.name')
      .where({ 'genre_movies.movie_id': id });
  }

  static async createGenreIfNotExists(genreNames) {
    const values = genreNames.map((_) => '(?)').join(', ');
    const query = `insert into genre (name) values ${values} on conflict do nothing;`;

    await knex.raw(query, [...genreNames]);
    return knex('genre').select('*').whereIn('name', genreNames);
  }
}

export default GenreRepository;
