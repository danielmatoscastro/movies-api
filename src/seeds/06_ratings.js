export const seed = (knex) => knex('ratings').del()
  .then(() => knex('ratings').insert([
    {
      rating_id: 1, content: 'The best movie of my entire life!', movie_id: 3, score: 5,
    },
    {
      rating_id: 2, content: 'The worst movie of my entire life!', movie_id: 1, score: 1,
    },
  ]));

export default seed;
