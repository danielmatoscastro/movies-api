export const up = (knex) => knex.schema.table('movies', (t) => {
  t.string('title').notNull();
});

export const down = (knex) => knex.schema.table('movies', (t) => {
  t.dropColumn('title');
});
