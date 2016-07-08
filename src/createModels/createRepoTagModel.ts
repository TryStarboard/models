import {Instance, Connection} from 'sequelize';
import Sequelize = require('sequelize');

export interface RepoTagAttributes {
  id: string;
  created_at: Date;
  updated_at: Date;
  tag_id: string;
  repo_id: string;
}

export interface RepoTagInstance extends Instance<RepoTagInstance, RepoTagAttributes>, RepoTagAttributes {
}

export default function (sequelize: Connection) {
  return sequelize.define<RepoTagInstance, RepoTagAttributes>(
    'repo_tag',
    {},
    {
      underscored: true,
    }
  );
}
