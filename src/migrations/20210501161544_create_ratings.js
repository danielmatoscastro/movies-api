export const up = (knex) => knex.schema.createTable('ratings', (t) => {
  t.increments('rating_id').primary();
  t.text('content').notNull();
  t.integer('movie_id').references('movie_id').inTable('movies').notNull();
});

export const down = (knex) => knex.schema.dropTable('ratings');
