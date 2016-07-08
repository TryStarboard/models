import {Instance, Connection} from 'sequelize';
import Sequelize = require('sequelize');

export interface RepoAttributes {
  id: string;
  github_id: number;
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
