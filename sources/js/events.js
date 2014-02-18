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
            list.remove(this.parentNode);
            socket.emit('delete', this.parentNode.getAttribute('data-id'));
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
            list.remove(id);
        });

        socket.on('created',  function (data) {
            list.append(data);
        });

        socket.on('stopped', function () {
            list.unset();
        });

    }
}