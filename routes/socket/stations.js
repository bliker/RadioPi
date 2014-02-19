var Station = require('../../models').Station;
var vlc = require('../../vlc');


module.exports = function (socket) {

    /**
     * Events that happen on connection of new client
     */
    Station.all().success(function(stations) {
        socket.emit('list', stations);
        if (global.current) socket.emit('changed', global.current);
    });

    /**
     * Storage methods
     */
    socket.on('create', function (data) {
        console.info('Created station: ' + data);
        Station.create(data);
        socket.broadcast.emit('created', data);
    });

    socket.on('delete', function (id) {
        console.info('Deleted station: ' + id);
        Station.destroy({id: id});
        socket.broadcast.emit('deleted', id);
        if (global.current == id) {
            console.info('Also stopping playback');
            vlc.stop();
            global.current = undefined;
        }
    });

    /*
     * Editing not implemented just yet
     * socket.on('edit', function (data) {
        socket.broadcast.emit('edited');
    });*/


    /**
     * Controls
     */
    socket.on('stop', function () {
        console.info('Stop event recieved');
        vlc.stop();
        socket.broadcast.emit('stopped');
    });

    socket.on('change', function (id) {
        console.info('Changed station to id: ' + id);
        global.current = id;
        if (vlc.playing) vlc.stop();

        socket.broadcast.emit('changed', id);
        playCurrent();
    });

    function playCurrent() {
        Station.find(global.current).success(function (station) {
            vlc.play(station.url);
        });
    }

}