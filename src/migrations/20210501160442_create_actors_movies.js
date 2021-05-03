export const up = (knex) => knex.schema.createTable('actors_movies', (t) => {
  t.integer('actor_id').references('actor_id').inTable('actors').notNull();
  t.integer('movie_id')
    .references('movie_id')
    .inTable('movies')
    .onDelete('CASCADE')
    .notNull();
  t.primary(['actor_id', 'movie_id']);
});

export const down = (knex) => knex.schema.dropTable('actors_movies');
