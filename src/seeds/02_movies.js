export const seed = (knex) => knex('genre_movies').del()
  .then(() => knex('movies').del())
  .then(() => knex('movies').insert([
    {
      movie_id: 1,
      title: 'Spider-Man',
      year: '2002',
      runtime: '121 min',
      plot: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.',
    },
    {
      movie_id: 2,
      title: 'Iron Man',
      year: '2008',
      runtime: '126 min',
      plot: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    },
    {
      movie_id: 3,
      title: 'The Avengers',
      year: '2012',
      runtime: '143 min',
      plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    },

  ]));

export default seed;
