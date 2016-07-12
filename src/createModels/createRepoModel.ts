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
import {TagAttributes, TagInstance} from './createTagModel';
import {RepoTagAttributes, RepoTagInstance} from './createRepoTagModel';

export interface RepoAttributes {
  id: string;
  github_id: string;
  full_name: string;
  description: string;
  homepage: string;
  html_url: string;
  forks_count: string;
  stargazers_count: string;
  starred_at: Date;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export interface RepoInstance extends Instance<RepoInstance, RepoAttributes>, RepoAttributes {
  getUser: BelongsToGetAssociationMixin<UserInstance>;
  setUser: BelongsToSetAssociationMixin<UserInstance, string>;
  createUser: BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;

  getTags: BelongsToManyGetAssociationsMixin<TagInstance>;
  setTags: BelongsToManySetAssociationsMixin<TagInstance, string, RepoTagAttributes>;
  addTags: BelongsToManyAddAssociationsMixin<TagInstance, string, RepoTagAttributes>;
  addTag: BelongsToManyAddAssociationMixin<TagInstance, string, RepoTagAttributes>;
  createTag: BelongsToManyCreateAssociationMixin<TagAttributes, TagInstance, RepoTagAttributes>;
  removeTag: BelongsToManyRemoveAssociationMixin<TagInstance, string>;
  removeTags: BelongsToManyRemoveAssociationsMixin<TagInstance, string>;
  hasTag: BelongsToManyHasAssociationMixin<TagInstance, string>;
  hasTags: BelongsToManyHasAssociationsMixin<TagInstance, string>;
  countTags: BelongsToManyCountAssociationsMixin;
}

export default function (sequelize: Connection) {
  return sequelize.define<RepoInstance, RepoAttributes>(
    'repo',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      github_id: {
        // BIGINT will be treated as string to prevent precision loss
        // see http://docs.sequelizejs.com/en/latest/api/datatypes/
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      full_name: {
        // Could use VARCHAR without length (in Postgres, it's the same as TEXT)
        // but Sequelize does not provide VARCHAR (STRING) without length
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      homepage: {
        type: Sequelize.TEXT,
      },
      html_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      forks_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stargazers_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      starred_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          // user_id is defined automatically when define relationships
          fields: ['user_id', 'github_id'],
          unique: true
        }
      ]
    }
  );
}
