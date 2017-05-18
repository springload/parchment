var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var blot_1 = require('./blot');
var linked_list_1 = require('../../collection/linked-list');
var Registry = require('../../registry');
var ParentBlot = (function (_super) {
    __extends(ParentBlot, _super);
    function ParentBlot(value) {
        _super.call(this, value);
        this.children = new linked_list_1.default();
        this.build();
    }
    ParentBlot.prototype.appendChild = function (other) {
        this.insertBefore(other);
    };
    ParentBlot.prototype.build = function () {
        var _this = this;
        var childNodes = Array.prototype.slice.call(this.domNode.childNodes);
        this.children.empty();
        // Need to be reversed for if DOM nodes already in order
        childNodes.reverse().forEach(function (node) {
            var child = Registry.create(node);
            if (child != null) {
                _this.insertBefore(child, _this.children.head);
            }
            else if (node.parentNode != null) {
                node.parentNode.removeChild(node);
            }
        });
    };
    ParentBlot.prototype.deleteAt = function (index, length) {
        if (index === 0 && length === this.getLength()) {
            this.remove();
        }
        else {
            this.children.forEachAt(index, length, function (child, offset, length) {
                child.deleteAt(offset, length);
            });
        }
    };
    ParentBlot.prototype.findPath = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var length = this.getLength();
        var _a = this.children.find(index, inclusive), child = _a[0], offset = _a[1];
        if (child == null) {
            child = this.children.tail;
            offset = child.getLength();
        }
        var pos = [{
                blot: this,
                offset: index - offset
            }];
        return pos.concat(child.findPath(offset, inclusive));
    };
    ParentBlot.prototype.format = function (name, value) {
        if (!value && name === this.statics.blotName) {
            this.unwrap();
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    ParentBlot.prototype.formatAt = function (index, length, name, value) {
        this.children.forEachAt(index, length, function (child, offset, length) {
            child.formatAt(offset, length, name, value);
        });
    };
    ParentBlot.prototype.getDescendants = function (index, length, type) {
        if (typeof length !== 'number') {
            type = index;
            index = 0;
            length = this.getLength();
        }
        var descendants = [];
        this.children.forEachAt(index, length, function (child) {
            if (child instanceof type) {
                descendants.push(child);
            }
            else if (child instanceof ParentBlot) {
                descendants = descendants.concat(child.getDescendants(type));
            }
        });
        return descendants;
    };
    ParentBlot.prototype.getFormat = function () {
        return {};
    };
    ParentBlot.prototype.getLength = function () {
        return this.children.reduce(function (memo, child) {
            return memo + child.getLength();
        }, 0);
    };
    ParentBlot.prototype.insertAt = function (index, value, def) {
        var _a = this.children.find(index), child = _a[0], offset = _a[1];
        if (child) {
            child.insertAt(offset, value, def);
        }
        else {
            var blot = (def == null) ? Registry.create('text', value) : Registry.create(value, def);
            this.insertBefore(blot);
        }
    };
    ParentBlot.prototype.insertBefore = function (childBlot, refBlot) {
        if (childBlot.parent != null) {
            childBlot.parent.children.remove(childBlot);
        }
        this.children.insertBefore(childBlot, refBlot);
        if (refBlot != null) {
            var refDomNode = refBlot.domNode;
        }
        if (childBlot.next == null || childBlot.domNode.nextSibling != refDomNode) {
            this.domNode.insertBefore(childBlot.domNode, refDomNode);
        }
        childBlot.parent = this;
    };
    ParentBlot.prototype.moveChildren = function (targetParent, refNode) {
        this.children.forEach(function (child) {
            targetParent.insertBefore(child, refNode);
        });
    };
    ParentBlot.prototype.replace = function (name, value) {
        if (name === this.statics.blotName && this.getFormat[name] === value) {
            return this;
        }
        // Implementation very similar to shadow.replace() but vitally important moveChildren
        // happens before remove() for proper merge
        var replacement = Registry.create(name, value);
        this.parent.insertBefore(replacement, this.next);
        this.moveChildren(replacement);
        this.remove();
        return replacement;
    };
    ParentBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.getLength())
                return this.next;
        }
        var after = this.clone();
        this.parent.insertBefore(after, this.next);
        this.children.forEachAt(index, this.getLength(), function (child, offset, length) {
            var child = child.split(offset, force);
            if (child) {
                after.appendChild(child);
            }
        });
        return after;
    };
    ParentBlot.prototype.unwrap = function () {
        this.moveChildren(this.parent, this.next);
        this.remove();
    };
    ParentBlot.blotName = 'parent';
    return ParentBlot;
})(blot_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ParentBlot;
