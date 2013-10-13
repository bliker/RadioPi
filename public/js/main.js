var streamer = {

    init: function() {

        var list = $('.list tbody');
        this.list = list;

        var that = this;

        list.on('click', 'tr', function(ev) {
            if(!$(this).hasClass('active')) {
                that.set($(this).index());
            }
        });

        $('.add').submit(function(event) {
            event.preventDefault();
            that.add($(this).serialize());
            that.load();
            this.reset();

            return false;
        });

        list.on('click', 'td:last-child', function (event) {
            event.preventDefault();
            event.stopPropagation();
            that.delete($(this).index());
            $(this).parent().remove();
        });

        this.load();
    },

    load: function (data) {
        this.get(function(data) {
            this.list.html('');
            for (var i = 0; i < data.urls.length; i++) {
                this.list.append('<tr><td></td><td>' + data.urls[i].name + '</td><td>'+ data.urls[i].url + '</td><td>X</td></tr>')
            };

            this.activate(data.stream);
        });
    },

    get: function(callback) {
        $.get('/load').done(function (data) {
            callback.apply(this, [data])
        }.bind(this)).fail(function() {
            alert('Loading urls failied')
        });
    },

    add: function(data) {
        $.post('/add', data, function () {
            console.log('Added item');
        });
    },

    activate: function(index) {
        var target = this.list.find('tr:eq('+index+')');
        this.list.children().removeClass('active');
        target.addClass('active');
    },

    delete: function(index) {
        $.post('/delete', {index: index -1}, function (data) {
            console.log('Item removed');
        })
    },

    set: function(index) {
        this.activate(index);
        $.post('/set', {index: index}, function(data) {
            console.log('new index set');
        });
    },
}

streamer.init()