'use strict';

const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const create = require('../lib').create;

module.exports = {
  up: function (queryInterface, Sequelize) {
    const sequelize = create({
      database: config.database,
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
    }).sequelize;

    return sequelize.sync();
  },

  down: function (queryInterface, Sequelize) {
    const sequelize = create({
      database: config.database,
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
    }).sequelize;

    return sequelize.drop();
  }
};
