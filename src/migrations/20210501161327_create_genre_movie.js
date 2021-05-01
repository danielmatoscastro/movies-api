export const up = (knex) => knex.schema.createTable('genre_movies', (t) => {
  t.integer('genre_id').references('genre_id').inTable('genre').notNull();
  t.integer('movie_id').references('movie_id').inTable('movies').notNull();
  t.primary(['genre_id', 'movie_id']);
});

export const down = (knex) => knex.schema.dropTable('genre_movies');
