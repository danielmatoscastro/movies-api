export const up = (knex) => knex.schema.createTable('movies', (t) => {
  t.increments('movie_id').primary();
  t.string('year').notNull();
  t.string('runtime').notNull();
  t.text('plot').notNull();
});

export const down = (knex) => knex.schema.dropTable('movies');
