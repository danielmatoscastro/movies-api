import actors from './data/actors.js';

export const seed = (knex) => knex('actors_movies').del()
  .then(() => knex('actors').del())
  .then(() => knex('actors').insert(actors));

export default seed;
