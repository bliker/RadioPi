module.exports = function (host) {

    function createElement (data) {
        // Prepare template
        var content = document.getElementById('template-station-item').content;

        // Add content
        var item = content.querySelector('.station-item')
        item.querySelector('.station-name').innerHTML = data.name;
        item.querySelector('.station-url').innerHTML = data.url;
        item.setAttribute('data-id', data.id);

        return $(document.importNode(content, true));
    }

    /**
     * Figure out if it is a number or node and return wrapped object
     */
    function normalize (object) {
        if (typeof object == 'number' || typeof object == 'string')
            return getById(object);
        else if (object instanceof jQuery)
            return object;

        return $(object);
    }

    function getById (id) {
        var result = host.find('.station-item[data-id=' + id + ']');
        if (!result.length) {
            console.error('List item not found');
            return false;
        }

        return result;
    }

    /**
     * Functions for interfacing wih the html list
     */
    return {

        host : host,

        empty : function () {
            return !host.find('.station-item').length > 0;
        },

        clear : function () {
            host.find('.station-item').remove();
        },

        /**
         * Append to list
         */
        append : function (data) {
            this.host.append(createElement(data));
        },

        /**
         * Remove by passing it a id or a DOM Node
         */
        remove : function (id) {
            var target = normalize(id);
            console.info('Removed item with id:' + target.attr('data-id'));
            target.remove();
        },

        /**
         * Set list item as currently playing
         */
        set : function (id) {
            var target = normalize(id);
            target.siblings().removeClass('station-playing');
            target.addClass('station-playing');
        },

        unset : function (id) {
            if (id) {
                var target = normalize(id);
                target.removeClass('station-playing');
            } else {
                // If id is missing just unset the selected one
                host.find('.station-playing').removeClass('station-playing');
            }
        }
    }
}