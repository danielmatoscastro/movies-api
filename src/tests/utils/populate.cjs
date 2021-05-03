/* eslint-disable import/order */
const knexConfig = require('../../../knexfile.cjs');
// import knexConfig from '../../../knexfile.js';

require('dotenv').config({ path: '.test.env' });

const knex = require('knex')(knexConfig);

module.exports = async () => {
  await knex.seed.run();
  await knex.raw('ALTER SEQUENCE movies_movie_id_seq RESTART WITH 4');
  return knex.raw('ALTER SEQUENCE actors_actor_id_seq RESTART WITH 12');
};
