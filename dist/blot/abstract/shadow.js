var Registry = require('../../registry');
var ShadowNode = (function () {
    function ShadowNode(node) {
        if (!(node instanceof Node)) {
            throw new Error("Shadow must be initialized with DOM Node but got: " + node);
        }
        this.domNode = node;
    }
    Object.defineProperty(ShadowNode.prototype, "statics", {
        // TODO: Hack for accessing inherited static methods
        get: function () {
            var statics = this.constructor;
            return {
                blotName: statics.blotName,
                tagName: statics.tagName
            };
        },
        enumerable: true,
        configurable: true
    });
    ShadowNode.prototype.clone = function () {
        var domNode = this.domNode.cloneNode();
        return Registry.create(domNode);
    };
    ShadowNode.prototype.getLength = function () {
        return 1;
    };
    ShadowNode.prototype.isolate = function (index, length) {
        var target = this.split(index);
        target.split(length);
        return target;
    };
    ShadowNode.prototype.remove = function () {
        this.parent.children.remove(this);
        if (this.domNode.parentNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
        }
    };
    ShadowNode.prototype.replace = function (name, value) {
        if (this.parent == null)
            return;
        var replacement = Registry.create(name, value);
        this.parent.insertBefore(replacement, this.next);
        this.remove();
        return replacement;
    };
    ShadowNode.prototype.split = function (index, force) {
        return index === 0 ? this : this.next;
    };
    ShadowNode.prototype.wrap = function (name, value) {
        var wrapper = Registry.create(name, value);
        this.parent.insertBefore(wrapper, this.next);
        wrapper.appendChild(this);
        return wrapper;
    };
    return ShadowNode;
})();
exports.default = ShadowNode;
