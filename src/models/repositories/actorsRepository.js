import knex from '../../connection.js';

class ActorsRepository {
  static findNamesByMovieId(id) {
    return knex('actors')
      .join('actors_movies', { 'actors_movies.actor_id': 'actors.actor_id' })
      .select('actors.name')
      .where({ 'actors_movies.movie_id': id });
  }
}

export default ActorsRepository;
