var Sequelize = require('sequelize');

var sequelize = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

exports.sequelize = sequelize;
exports.Station = require('./station')(sequelize);