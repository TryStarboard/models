'use strict';

const R = require('ramda');
const co = require('co');
const create = require('../lib').create;

const models = create({
  database: 'starboard-prod',
  user: 'starboard-prod',
  host: 'localhost',
  port: 5432,
});

const pModels = create({
  database: 'starboard-prod',
  user: 'starboard-prod',
  host: 'localhost',
  port: 30100,
});

co(function *() {
  // yield pModels.sequelize.drop();
  // yield pModels.sequelize.sync();

  const users = yield models.User.findAll()
  const usersData = users.map(u => R.omit(['id'], u.toJSON()));
  const pusers = yield pModels.User.bulkCreate(usersData);
  console.log('created all users');

  for (const puser of pusers) {
    const user = users.find(u => u.github_id === puser.github_id)

    const tags = yield user.getTags();
    for (const tag of tags) {
      yield puser.createTag(R.omit(['id'], tag.toJSON()));
    }
    console.log(`created all tags for user ${user.id}`)

    const repos = yield user.getRepos();
    for (const repo of repos) {
      const prepo = yield puser.createRepo(R.omit(['id'], repo.toJSON()));
      const tags = yield repo.getTags();
      const ptags = yield puser.getTags({
        where: {
          text: {
            $in: tags.map(t => t.text)
          }
        }
      });
      yield prepo.addTags(ptags);
    }
    console.log(`created all repos for user ${user.id}`)
  }
})
.catch(err => console.log(err.stack));
