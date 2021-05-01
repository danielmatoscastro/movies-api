export const up = (knex) => knex.schema.createTable('actors', (t) => {
  t.increments('actor_id').primary();
  t.string('name').notNull();
});

export const down = (knex) => knex.schema.dropTable('actors');
