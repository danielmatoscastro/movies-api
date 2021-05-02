/* eslint-disable import/order */
const knexConfig = require('../../../knexfile.cjs');
// import knexConfig from '../../../knexfile.js';

require('dotenv').config({ path: '.test.env' });

const knex = require('knex')(knexConfig);

module.exports = async () => knex.seed.run();
