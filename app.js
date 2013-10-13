var player = require('./player.js'),
    Storage = require('./storage.js'),

    express = require('express'),
    app = express(),
    data = new Storage('data.json');

/* Web Ui */

app.configure(function (){
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

var router = require('./router.js')(app, data, player);
app.listen(3000);

/* Manual controls */

var gpio = require('gpio'),
    gpio17 = gpio.export(17, {direction: "in"});

gpio17.on('change', function(value) {
    if(value) { player.play(data.current.url); }
    else { player.stop(); }
});