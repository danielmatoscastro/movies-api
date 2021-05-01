export const up = (knex) => knex.schema.table('ratings', (t) => {
  t.timestamp('created_at').defaultTo(knex.fn.now());
  t.integer('score').notNull();
});

export const down = (knex) => knex.schema.table('ratings', (t) => {
  t.dropColumn('created_at');
  t.dropColumn('score');
});
