import ratings from './data/ratings.js';

export const seed = (knex) => knex('ratings').del().then(() => knex('ratings').insert(ratings));

export default seed;
