export const up = (knex) => knex.schema.alterTable('actors', (t) => {
  t.unique('name');
});

export const down = (knex) => knex.schema.alterTable('actors', (t) => {
  t.dropUnique('name');
});
