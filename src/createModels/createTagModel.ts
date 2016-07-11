import {
  Instance,
  Connection,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
} from 'sequelize';
import Sequelize = require('sequelize');
import {UserAttributes, UserInstance} from './createUserModel';
import {RepoAttributes, RepoInstance} from './createRepoModel';
import {RepoTagAttributes, RepoTagInstance} from './createRepoTagModel';

export interface TagAttributes {
  id: string;
  text: string;
  foreground_color: string;
  background_color: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export interface TagInstance extends Instance<TagInstance, TagAttributes>, TagAttributes {
  getUser: BelongsToGetAssociationMixin<UserInstance>;
  setUser: BelongsToSetAssociationMixin<UserInstance, string>;
  createUser: BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;

  getRepos: BelongsToManyGetAssociationsMixin<RepoInstance>;
  setRepos: BelongsToManySetAssociationsMixin<RepoInstance, string, RepoTagAttributes>;
  addRepos: BelongsToManyAddAssociationsMixin<RepoInstance, string, RepoTagAttributes>;
  addRepo: BelongsToManyAddAssociationMixin<RepoInstance, string, RepoTagAttributes>;
  createRepo: BelongsToManyCreateAssociationMixin<RepoAttributes, UserInstance, RepoTagAttributes>;
  removeRepo: BelongsToManyRemoveAssociationMixin<RepoInstance, string>;
  removeRepos: BelongsToManyRemoveAssociationsMixin<RepoInstance, string>;
  hasRepo: BelongsToManyHasAssociationMixin<RepoInstance, string>;
  hasRepos: BelongsToManyHasAssociationsMixin<RepoInstance, string>;
  countRepos: BelongsToManyCountAssociationsMixin;
}

export default function (sequelize: Connection) {
  return sequelize.define<TagInstance, TagAttributes>(
    'tag',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      foreground_color: {
        type: Sequelize.TEXT,
      },
      background_color: {
        type: Sequelize.TEXT,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          // user_id is defined automatically when define relationships
          fields: ['user_id', 'text'],
          unique: true
        },
      ],
    }
  );
}
