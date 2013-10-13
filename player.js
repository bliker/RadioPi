var spawn = require('child_process').spawn,
    log = require('util').log;

module.exports = {

    stream: false,

    play: function(url) {

        if(!this.stream) {
            this.stream = spawn('mplayer', ['-quiet' ,'-playlist', url]);

            log('Start streaming');
        } else {
            log('Already streaming')
        }
    },

    stop: function() {
        if(this.stream) {
            this.stream.kill('SIGTERM');
            this.stream = false;
            log('Stop streaming')
        }

        log('Nothing to stop')
    }
}

