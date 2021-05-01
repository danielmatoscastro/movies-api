export const seed = (knex) => knex('genre_movies').del()
  .then(() => knex('genre_movies').insert([
    { genre_id: 1, movie_id: 3 },
    { genre_id: 2, movie_id: 3 },
    { genre_id: 3, movie_id: 3 },
    { genre_id: 1, movie_id: 2 },
    { genre_id: 2, movie_id: 2 },
    { genre_id: 3, movie_id: 2 },
    { genre_id: 1, movie_id: 1 },
    { genre_id: 2, movie_id: 1 },
    { genre_id: 3, movie_id: 1 },
  ]));

export default seed;
