'use strict';

const knex = require('knex');
const createUserModel = require('./models/Users').createModel;
const createTagModel = require('./models/Tags').createModel;
const createRepoModel = require('./models/Repos').createModel;
const createRepoTagModel = require('./models/RepoTags').createModel;

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

  const User = createUserModel(db);
  const Tag = createTagModel(db);
  const Repo = createRepoModel(db);
  const RepoTag = createRepoTagModel(db);

  return {
    User,
    Tag,
    Repo,
    RepoTag,
  };
}

module.exports = {
  createModels,
};
