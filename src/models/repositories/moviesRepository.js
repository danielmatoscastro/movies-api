import knex from '../../connection.js';

class MoviesRepository {
  static find() {
    return knex('movies').select();
  }

  static findById(id) {
    return knex('movies')
      .select()
      .where({ movie_id: id })
      .first();
  }

  static findSelectedMovies(ids, rating) {
    const hasIds = ids && ids.length > 0;
    const hasRating = rating !== undefined;

    if (hasIds && hasRating) {
      return knex('movies as mo')
        .select()
        .whereIn('movie_id', ids)
        .andWhere((builder) => {
          const sub = knex('ratings as rat').select('movie_id').where(knex.raw('rat.movie_id = mo.movie_id'));
          return rating
            ? builder.whereExists(sub)
            : builder.whereNotExists(sub);
        });
    }

    if (hasIds) {
      return knex('movies as mo')
        .select()
        .whereIn('movie_id', ids);
    }

    // hasRating
    return knex('movies as mo')
      .select()
      .where((builder) => {
        const sub = knex('ratings as rat').select('movie_id').where(knex.raw('rat.movie_id = mo.movie_id'));
        return rating
          ? builder.whereExists(sub)
          : builder.whereNotExists(sub);
      });
  }

  static createMovie(movie) {
    return knex('movies').insert(movie, '*');
  }

  static updateMovie(id, movie) {
    return knex('movies').update(movie).where({ movie_id: id });
  }

  static deleteMovie(id) {
    return knex('movies').delete().where({ movie_id: id });
  }
}

export default MoviesRepository;
