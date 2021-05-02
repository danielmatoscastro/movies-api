/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const KnexCleaner = require('knex-cleaner');
const knexConfig = require('../../../knexfile.cjs');
const knex = require('knex')(knexConfig);

require('dotenv').config({ path: '.test.env' });

module.exports = async () => {
  await KnexCleaner.clean(knex, {
    mode: 'truncate',
    restartIdentity: true,
  });
};
