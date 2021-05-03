export const up = (knex) => knex.schema.alterTable('movies', (t) => {
  t.unique('title');
});

export const down = (knex) => knex.schema.alterTable('movies', (t) => {
  t.dropUnique('title');
});
