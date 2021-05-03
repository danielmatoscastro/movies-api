import knex from '../../connection.js';

class ActorsMoviesRepository {
  static async createActorsMovies(movieId, actorsIds) {
    const actorsMovies = actorsIds.map((ac) => ({ movie_id: movieId, actor_id: ac }));
    return knex('actors_movies').insert(actorsMovies, '*');
  }

  static async updateActorsMovies(movieId, actorsIds) {
    await knex('actors_movies').delete().where({ movie_id: movieId });

    const actorsMovies = actorsIds.map((ac) => ({ movie_id: movieId, actor_id: ac }));
    return knex('actors_movies').insert(actorsMovies, '*');
  }
}

export default ActorsMoviesRepository;
