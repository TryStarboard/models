'use strict';

const {wrap} = require('co');

function createModel(db) {
  const addRepoTag = wrap(function *(data) {
    const [repo_tag] = yield db('repo_tags').insert(data, '*');
    return repo_tag;
  });

  const deleteRepoTag = wrap(function *({repo_id, tag_id}) {
    yield db('repo_tags').where({repo_id, tag_id}).del();
  });

  return {
    addRepoTag,
    deleteRepoTag,
  };
}

module.exports = {
  createModel,
};
