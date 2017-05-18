var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Registry = require('../../registry');
var shadow_1 = require('./shadow');
var DATA_KEY = '__blot_data';
exports.DEFAULT_SCOPE = ['container', 'block', 'inline', 'leaf'];
var Blot = (function (_super) {
    __extends(Blot, _super);
    function Blot(node) {
        if (!(node instanceof Node)) {
            if (Array.isArray(this.statics.tagName) && this.statics.tagName.indexOf(node) > -1) {
                node = document.createElement(node);
            }
            else {
                node = document.createElement(this.statics.tagName);
            }
        }
        _super.call(this, node);
        this.domNode[DATA_KEY] = this;
    }
    Blot.findBlot = function (node) {
        while (true) {
            if (node == null)
                return null;
            if (node[DATA_KEY])
                return node[DATA_KEY];
            node = node.parentNode;
        }
    };
    Blot.prototype.deleteAt = function (index, length) {
        var target = this.isolate(index, length);
        target.remove();
    };
    Blot.prototype.findPath = function (index, inclusive) {
        return [{
                blot: this,
                offset: Math.min(index, this.getLength())
            }];
    };
    Blot.prototype.format = function (name, value) {
        var mergeTarget = this;
        if (Registry.match(name) && value) {
            mergeTarget = this.wrap(name, value);
        }
        if (mergeTarget.prev != null) {
            mergeTarget.prev.merge();
        }
    };
    Blot.prototype.formatAt = function (index, length, name, value) {
        var target = this.isolate(index, length);
        target.format(name, value);
    };
    Blot.prototype.insertAt = function (index, value, def) {
        var target = this.split(index);
        var blot = (def == null) ? Registry.create('text', value) : Registry.create(value, def);
        this.parent.insertBefore(blot, target);
    };
    Blot.prototype.merge = function (target) {
        if (target === void 0) { target = this.next; }
        return false;
    };
    Blot.prototype.offset = function (root) {
        if (this.parent == null || root == this)
            return 0;
        // TODO rewrite this when we properly define parent as a BlotParent
        if (root == null) {
            return this.parent.children.offset(this);
        }
        else {
            return this.parent.children.offset(this) + this.parent.offset(root);
        }
    };
    Blot.prototype.remove = function () {
        delete this.domNode[DATA_KEY];
        _super.prototype.remove.call(this);
        if (this.prev != null) {
            this.prev.merge();
        }
    };
    Blot.blotName = 'blot';
    return Blot;
})(shadow_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blot;
