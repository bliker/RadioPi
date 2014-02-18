var vlc = require('vlc')([
  '-I', 'dummy',
  '-V', 'dummy',
  '--verbose', '1',
  '--no-video-title-show',
  '--no-disable-screensaver',
  '--no-snapshot-preview',
]);

var player = vlc.mediaplayer,
    mediaDefined = false;

function getMedia (url) {
    var media = vlc.mediaFromUrl(url);
    media.parseSync();
    return media;
}


module.exports = {

    playing : false,

    play : function (url) {
        var media = getMedia(url);
        player.media = media;
        this.playing = true;
        player.play();
    },

    stop : function () {
        this.playing = false;
        player.stop();
    }
}
