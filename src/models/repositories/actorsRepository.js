import knex from '../../connection.js';

class ActorsRepository {
  static findNamesByMovieId(id) {
    return knex('actors')
      .join('actors_movies', { 'actors_movies.actor_id': 'actors.actor_id' })
      .select('actors.name')
      .where({ 'actors_movies.movie_id': id });
  }

  static async createActorsIfNotExists(actorsNames) {
    const values = actorsNames.map((_) => '(?)').join(', ');
    const query = `insert into actors (name) values ${values} on conflict do nothing;`;

    await knex.raw(query, [...actorsNames]);
    return knex('actors').select('*').whereIn('name', actorsNames);
  }
}

export default ActorsRepository;
