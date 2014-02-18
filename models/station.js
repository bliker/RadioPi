var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Station', {
    name: Sequelize.STRING,
    url: Sequelize.TEXT,
  });
}

