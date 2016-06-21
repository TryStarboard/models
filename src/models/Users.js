'use strict';

const {wrap} = require('co');

function createModel(db) {
  const findById = wrap(function *(id) {
    const [ user ] = yield db
      .select('id', 'email', 'displayname', 'avatar')
      .from('users')
      .where('id', id);
    return user;
  });

  const deleteUser = wrap(function *(id) {
    yield [
      db('repo_tags').where({user_id: id}).del(),
      db('tags').where({user_id: id}).del(),
      db('repos').where({user_id: id}).del(),
      db('users').where({id}).del(),
    ];
  });

  /**
   * Update user from github user data
   *
   * @param {Data}   data
   * @param {string} access_token
   * @yield {string} User ID
   */
  const upsert = wrap(function *(data, access_token) {
    const user = {
      github_id: data.id,
      email: data.email,
      username: data.username,
      displayname: data.name,
      avatar: data.avatar_url,
      access_token,
    };

    const {rows: [ userRecord ]} = yield db.raw(`
      ? ON CONFLICT (github_id)
      DO UPDATE SET
        (email, username, access_token, displayname, avatar) =
        (EXCLUDED.email, EXCLUDED.username, EXCLUDED.access_token, EXCLUDED.displayname, EXCLUDED.avatar)
      RETURNING id`,
      [ db('users').insert(user) ]
    );

    return userRecord.id;
  });

  return {
    findById,
    deleteUser,
    upsert,
  };
}

module.exports = {
  createModel,
};
