export const up = (knex) => knex.schema.createTable('genre', (t) => {
  t.increments('genre_id').primary();
  t.string('name').notNull();
});

export const down = (knex) => knex.schema.dropTable('genre');
