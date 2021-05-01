export const seed = (knex) => knex('actors_movies').del()
  .then(() => knex('actors').del())
  .then(() => knex('actors').insert([
    { actor_id: 1, name: 'Tobey Maguire' },
    { actor_id: 2, name: 'Willem Dafoe' },
    { actor_id: 3, name: 'Kirsten Dunst' },
    { actor_id: 4, name: 'James Franco' },
    { actor_id: 5, name: 'Robert Downey Jr.' },
    { actor_id: 6, name: 'Terrence Howard' },
    { actor_id: 7, name: 'Jeff Bridges' },
    { actor_id: 8, name: 'Gwyneth Paltrow' },
    { actor_id: 9, name: 'Chris Evans' },
    { actor_id: 10, name: 'Mark Ruffalo' },
    { actor_id: 11, name: 'Chris Hemsworth' },
  ]));

export default seed;
