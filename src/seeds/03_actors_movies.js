import actorsMovies from './data/actorsMovies.js';

export const seed = (knex) => knex('actors_movies').del().then(() => knex('actors_movies').insert(actorsMovies));

export default seed;
