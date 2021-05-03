export const up = (knex) => knex.schema.table('ratings', (t) => {
  t.integer('score').notNull().alter();
});

export const down = (knex) => knex.schema.table('ratings', (t) => {
  t.dropColumn('score');
});
