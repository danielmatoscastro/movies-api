export const up = (knex) => knex.schema.alterTable('genre', (t) => {
  t.unique('name');
});

export const down = (knex) => knex.schema.alterTable('genre', (t) => {
  t.dropUnique('name');
});
