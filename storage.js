var fs = require('fs'),a
    log = require('util').log;

var Storage = function (filename) {
    this.load(filename);
    this.filename = filename;
}

Storage.prototype.set = function(index) {
    this.data.stream = index;
    log('Changing index to' + index);
    this.save();
};

Object.defineProperty(Storage.prototype, 'current', {
    get: function() {
        return this.data.urls[this.data.stream];
    }
})

Storage.prototype.push = function(name, url) {

    this.data.urls.push({
        name: name,
        url: url
    });

    this.save();
};

Storage.prototype.save = function() {
    fs.writeFile(this.filename, JSON.stringify(this.data), function (err) {
        if(err) throw err;
        log('File saved');
    })
};

Storage.prototype.delete = function(index) {
    log('Deleted url:', this.data.urls.splice(index, 1));
};

Storage.prototype.load = function(filename) {
    data = fs.readFileSync(filename).toString();
    this.data = JSON.parse(data);
};

module.exports = Storage