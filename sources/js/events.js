module.exports = function (list, socket) {

    /**
     * Loads stations
     */
    load();

    /**
     * Binds events to list
     */
    listEvents();



    function load () {
        socket.on('list', function (data) {
            if(!list.empty()) {
                list.clear();
            }
            $.each(data, function (index, item) {
                list.append(item);
            });
        });
    }

    function listEvents () {

        /**
         * Adding
         */
        $('.station-add').submit(function (e) {
            var data = {
                name: $(this).find('input[name=name]').val(),
                url: $(this).find('input[name=url]').val(),
            }

            this.reset();

            list.append(data);
            socket.emit('create', data);
            e.preventDefault();
        });


        /**
         * Deleting
         */
        list.host.on('click', '.station-item .station-delete', function (event) {
            if(confirm('Are you sure you wanna?')) {
                var id = $(this).parent().attr('data-id');
                list.remove(this.parentNode);
                socket.emit('delete', id);
            }
        });

        /**
         * Changing station
         */
        list.host.on('click', '.station-item', function (event) {
            var el = $(this);
            if (el.hasClass('station-playing')) {
                // Stop if clicked on currently playing
                list.unset(el);
                socket.emit('stop');
            } else {
                // Start if not currently playing
                var id = el.attr('data-id');
                socket.emit('change', id);
                list.set(el);
            }
        });

        /**
         * Broadcasts ------------------
         */

        socket.on('deleted', function (id) {
            console.info('Recieved deleted event with id: ' + id);
            list.remove(id);
        });

        socket.on('created',  function (data) {
            console.info('Recieved create event with data: ', data);
            list.append(data);
        });

        socket.on('stopped', function () {
            console.info('Recieved stoped event');
            list.unset();
        });

        socket.on('changed', function (id) {
            console.info('Recieved changed event with id: ' + id);
            list.set(id);
        })

    }
}