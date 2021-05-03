import ratings from './data/ratings.js';

export const seed = (knex) => knex('ratings').del()
  .then(() => knex('ratings').insert(ratings))
  .then(() => knex.raw('ALTER SEQUENCE ratings_rating_id_seq RESTART WITH 3'));

export default seed;
