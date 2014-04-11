var Template = function (node) {
    this.content = node.content;
}

Template.prototype.fill = function(selector, text) {
    this.content.querySelector(selector).textContent = text;
};

// Template.prototype.fillHTML = function(selector, html) {
//     this.content.querySelector.innerHTML = html;
// };

Template.prototype.attr = function(selector, name, value) {
    if (value) {
        this.content.querySelector(selector).setAttribute(name, value);
    } else {
        return this.content.querySelector(selector).getAttribute(name);
    }
};

Template.prototype.create = function() {
    return document.importNode(this.content, true);
};

/**
 * Get template from dom
 * @param  {string} selector Selector to be passed to querySelector
 * @return {Template}        Instance of Template
 */
exports.get = function (selector) {
    return new Template(document.querySelector(selector));
}