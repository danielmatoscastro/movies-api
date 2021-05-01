export const seed = (knex) => knex('genre').del()
  .then(() => knex('genre').insert([
    { genre_id: 1, name: 'Action' },
    { genre_id: 2, name: 'Adventure' },
    { genre_id: 3, name: 'Sci-Fi' },
  ]));

export default seed;
