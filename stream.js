var spawn = require('child_process').spawn,
    log = require('util').log;

module.exports = {

    stream: false,

    play: function(url) {

        if(!this.stream) {
            this.stream = spawn('mplayer', ['-quiet' ,'-playlist', url]);

            this.stream.stdout.on('data', function (data) {
                console.log(data.toString());
            })

            this.stream.stderr.on('data', function (data) {
                console.log(data.toString());
            })
        } else {
            log('Already streaming')
        }
    },

    stop: function() {
        if(this.stream) {
            this.stream.kill('SIGTERM');
            this.stream = false;
        }
    }
}

