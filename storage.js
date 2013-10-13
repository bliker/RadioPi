var fs = require('fs'),a
    log = require('util').log;

var Storage = function (filename) {
    this.load(filename);
    this.filename = filename;
}

/**
 * Set current stream
 */
Storage.prototype.set = function(index) {
    this.all.stream = index;
    this.save();
};

/**
 * Get current stream
 */
Object.defineProperty(Storage.prototype, 'current', {
    get: function() { return this.all.urls[this.all.stream]; }
})

/**
 * Add new stream to storage
 */
Storage.prototype.push = function(name, url) {
    this.all.urls.push({
        name: name,
        url: url
    });

    this.save();
};

/**
 * Write changes to file
 */
Storage.prototype.save = function() {
    fs.writeFile(this.filename, JSON.stringify(this.all), function (err) {
        if(err) throw err;
        log('File saved');
    })
};

/**
 * Delete entry form storage
 */
Storage.prototype.delete = function(index) {
    deleted = this.all.urls.splice(index, 1);
    this.save();
    log('Deleted url' + deleted);

    return deleted;
};

/**
 * Load entries from disk
 */
Storage.prototype.load = function(filename) {
    data = fs.readFileSync(filename).toString();
    this.all = JSON.parse(data);
};

module.exports = Storage