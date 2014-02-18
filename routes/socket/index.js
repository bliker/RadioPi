module.exports = function (io) {
    io.of('/stations').on('connection', require('./stations'));
}