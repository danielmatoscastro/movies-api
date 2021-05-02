import movies from './data/movies.js';

export const seed = (knex) => knex('genre_movies').del()
  .then(() => knex('ratings').del())
  .then(() => knex('movies').del())
  .then(() => knex('movies').insert(movies));

export default seed;
