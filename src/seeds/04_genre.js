import genre from './data/genre.js';

export const seed = (knex) => knex('genre').del().then(() => knex('genre').insert(genre));

export default seed;
