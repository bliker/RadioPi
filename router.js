module.exports = function (app, data, player) {

    app.get('/load', function (req, res){
        res.json(data.all);
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
        player.stop()
        player.play(data.current.url);
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
}