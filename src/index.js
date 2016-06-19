'use strict';

const knex = require('knex');
const createTagModel = require('./models/Tags').createModel;
const createRepoModel = require('./models/Repos').createModel;

/**
 * @param  {Object} opts
 * @param  {Object} opts.connection
 * @return {Object}
 */
function createModels(opts) {
  const db = knex({
    client: 'pg',
    connection: opts.connection,
  });

  const Tag = createTagModel(db);
  const Repo = createRepoModel(db);

  return {
    Tag,
    Repo,
  };
}

module.exports = {
  createModels,
};
