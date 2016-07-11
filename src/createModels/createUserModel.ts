import {
  Instance,
  Connection,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize';
import Sequelize = require('sequelize');
import {RepoAttributes, RepoInstance} from './createRepoModel';
import {TagAttributes, TagInstance} from './createTagModel';

export interface UserAttributes {
  id: string;
  github_id: number;
  email: string;
  username: string;
  access_token: string;
  refresh_token: string;
  displayname: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserInstance extends Instance<UserInstance, UserAttributes>, UserAttributes {
  getRepos: HasManyGetAssociationsMixin<RepoInstance>;
  setRepos: HasManySetAssociationsMixin<RepoInstance, string>;
  addRepos: HasManyAddAssociationsMixin<RepoInstance, string>;
  addRepo: HasManyAddAssociationMixin<RepoInstance, string>;
  createRepo: HasManyCreateAssociationMixin<RepoAttributes, RepoInstance>;
  removeRepo: HasManyRemoveAssociationMixin<RepoInstance, string>;
  removeRepos: HasManyRemoveAssociationsMixin<RepoInstance, string>;
  hasRepo: HasManyHasAssociationMixin<RepoInstance, string>;
  hasRepos: HasManyHasAssociationsMixin<RepoInstance, string>;
  countRepos: HasManyCountAssociationsMixin;

  getTags: HasManyGetAssociationsMixin<TagInstance>;
  setTags: HasManySetAssociationsMixin<TagInstance, string>;
  addTags: HasManyAddAssociationsMixin<TagInstance, string>;
  addTag: HasManyAddAssociationMixin<TagInstance, string>;
  createTag: HasManyCreateAssociationMixin<TagAttributes, TagInstance>;
  removeTag: HasManyRemoveAssociationMixin<TagInstance, string>;
  removeTags: HasManyRemoveAssociationsMixin<TagInstance, string>;
  hasTag: HasManyHasAssociationMixin<TagInstance, string>;
  hasTags: HasManyHasAssociationsMixin<TagInstance, string>;
  countTags: HasManyCountAssociationsMixin;
}

export default function (sequelize: Connection) {
  return sequelize.define<UserInstance, UserAttributes>(
    'user',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      github_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      email: {
        // Could use VARCHAR without length (in Postgres, it's the same as TEXT)
        // but Sequelize does not provide VARCHAR (STRING) without length
        type: Sequelize.TEXT,
        unique: true,
      },
      username: {
        type: Sequelize.TEXT,
        unique: true,
      },
      access_token: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        unique: true,
      },
      displayname: {
        type: Sequelize.TEXT,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
    },
    {
      underscored: true,
    }
  );
}
