var stream = require('./stream.js'),
    Storage = require('./storage.js'),
    log = require('util').log;

var express = require('express');
var app = express();

app.configure(function (){
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

var data = new Storage('data.json')

app.get('/load', function (req, res){
    res.json(data.data);
});

app.post('/add', function (req, res){
    if(!req.body.url || !req.body.name) {
        res.send(400, {error: 'You have to send the url'});
        return;
    }
    data.push(req.body.name, req.body.url);
    res.send(200);
});

app.post('/set', function (req, res) {
    if(!req.body.index) {
        res.send(400, {error: 'Index is missing'});
        return;
    }

    data.set(req.body.index);
    stream.stop()
    stream.play(data.current.url);
    res.send(200)
});

app.post('/delete', function (req, res) {
    if(!req.body.index) {
        res.send(400, {error: 'Index is missing'});
        return;
    }
    data.delete(req.body.index);
    res.send(200);
});

app.listen(3000);

var gpio = require('gpio'),
    gpio17 = gpio.export(17, {direction: "in"});

gpio17.on('change', function(value) {
    if(value) {
        log('Starting playback: ' + data.current.name)
        stream.play(data.current.url)
    }
    else {
        log('Stop playback')
        stream.stop()
    }
});