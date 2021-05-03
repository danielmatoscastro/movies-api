import genre from './data/genre.js';

export const seed = (knex) => knex('genre').del()
  .then(() => knex('genre').insert(genre))
  .then(() => knex.raw('ALTER SEQUENCE genre_genre_id_seq RESTART WITH 4'));

export default seed;
