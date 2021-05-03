import actors from './data/actors.js';

export const seed = (knex) => knex('actors_movies').del()
  .then(() => knex('actors').del())
  .then(() => knex('actors').insert(actors))
  .then(() => knex.raw('ALTER SEQUENCE actors_actor_id_seq RESTART WITH 12'));

export default seed;
