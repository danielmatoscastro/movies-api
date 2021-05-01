export const seed = (knex) => knex('actors_movies').del()
  .then(() => knex('actors_movies').insert([
    {
      actor_id: 1,
      movie_id: 1,
    },
    {
      actor_id: 2,
      movie_id: 1,
    },
    {
      actor_id: 3,
      movie_id: 1,
    },
    {
      actor_id: 4,
      movie_id: 1,
    },
    {
      actor_id: 5,
      movie_id: 2,
    },
    {
      actor_id: 6,
      movie_id: 2,
    },
    {
      actor_id: 7,
      movie_id: 2,
    },
    {
      actor_id: 8,
      movie_id: 2,
    },
    {
      actor_id: 5,
      movie_id: 3,
    },
    {
      actor_id: 8,
      movie_id: 3,
    },
    {
      actor_id: 9,
      movie_id: 3,
    },
    {
      actor_id: 10,
      movie_id: 3,
    },
    {
      actor_id: 11,
      movie_id: 3,
    },
  ]));

export default seed;
