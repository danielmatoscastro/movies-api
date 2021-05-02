import genreMovies from './data/genreMovies.js';

export const seed = (knex) => knex('genre_movies').del().then(() => knex('genre_movies').insert(genreMovies));

export default seed;
