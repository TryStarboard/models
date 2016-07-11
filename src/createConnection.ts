import Sequelize = require('sequelize');

export interface ConnectionOptions {
  database: string;
  user: string;
  password?: string;
  host: string;
  port: number;
}

export default function (opts: ConnectionOptions) {
  return new Sequelize(opts.database, opts.user, opts.password, {
    host: opts.host,
    port: opts.port,
    dialect: 'postgres',
    logging: () => {}
  });
}
