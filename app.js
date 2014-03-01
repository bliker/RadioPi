
/**
 * Init express.
 */
var express = require('express'), app = express();

/**
 * Setup enviroment
 */
require('./config')(app);

/**
 * Define routes on app
 */
require('./routes/express')(app);

/**
 * Prepare server and bind socket.io
 */
var server = require('http').createServer(app),
    io = require('socket.io').listen(server);

require('./routes/socket')(io);

/**
 * create and Bind models
 */
var model = require('./models');
model.sequelize.sync().complete(function (err) {
  if (err) {throw err};
  console.info('Listening on http://localhost:' + 8000);
  server.listen(8000);
});
