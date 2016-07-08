import * as Sequelize from 'sequelize';
import * as UserModel from './createModels/createUserModel';
import * as TagModel from './createModels/createTagModel';
import * as RepoModel from './createModels/createRepoModel';
import * as RepoTagModel from './createModels/createRepoTagModel';
import createConnection, {ConnectionOptions} from './createConnection';
import createModels from './createModels';

function create(opts: ConnectionOptions) {
  const sequelize = createConnection(opts);
  const models = createModels(sequelize);
  return models;
}

export = {
  create,
};
