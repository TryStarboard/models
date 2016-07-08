import {Instance, Connection} from 'sequelize';
import Sequelize = require('sequelize');

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
