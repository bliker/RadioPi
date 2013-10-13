var fs = require('fs'),a
    log = require('util').log;

var Storage = function (filename) {
    this.load(filename);
    this.filename = filename;
}

Storage.prototype.set = function(index) {
    this.all.stream = index;
    log('Changing index to' + index);
    this.save();
};

Object.defineProperty(Storage.prototype, 'current', {
    get: function() {
        return this.all.urls[this.all.stream];
    }
})

Storage.prototype.push = function(name, url) {

    this.all.urls.push({
        name: name,
        url: url
    });

    this.save();
};

Storage.prototype.save = function() {
    fs.writeFile(this.filename, JSON.stringify(this.all), function (err) {
        if(err) throw err;
        log('File saved');
    })
};

Storage.prototype.delete = function(index) {
    log('Deleted url:', this.all.urls.splice(index, 1));
};

Storage.prototype.load = function(filename) {
    data = fs.readFileSync(filename).toString();
    this.all = JSON.parse(data);
};

module.exports = Storage