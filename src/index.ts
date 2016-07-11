import * as Sequelize from 'sequelize';
import {UserAttributes, UserInstance} from './createModels/createUserModel';
import {TagAttributes, TagInstance} from './createModels/createTagModel';
import {RepoAttributes, RepoInstance} from './createModels/createRepoModel';
import {RepoTagAttributes, RepoTagInstance} from './createModels/createRepoTagModel';
import createConnection, {ConnectionOptions} from './createConnection';
import createModels from './createModels';

export function create(opts: ConnectionOptions) {
  const sequelize = createConnection(opts);
  const models = createModels(sequelize);
  return models;
}

export {
  UserAttributes,
  UserInstance,
  TagAttributes,
  TagInstance,
  RepoAttributes,
  RepoInstance,
  RepoTagAttributes,
  RepoTagInstance,
};
