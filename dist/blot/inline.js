var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var format_1 = require('./abstract/format');
var Registry = require('../registry');
// Shallow object comparison
function isEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    for (var prop in obj1) {
        if (obj1[prop] !== obj2[prop])
            return false;
    }
    return true;
}
var InlineBlot = (function (_super) {
    __extends(InlineBlot, _super);
    function InlineBlot() {
        _super.apply(this, arguments);
    }
    InlineBlot.prototype.format = function (name, value) {
        _super.prototype.format.call(this, name, value);
        if (Object.keys(this.getFormat()).length === 0) {
            this.unwrap();
        }
    };
    InlineBlot.prototype.formatAt = function (index, length, name, value) {
        if (Registry.match(name, Registry.Type.ATTRIBUTE) ||
            InlineBlot.compare(this.statics.blotName, name)) {
            var formats = this.getFormat();
            if (value && formats[name] === value)
                return;
            if (!value && !formats[name])
                return;
            var target = this.isolate(index, length);
            target.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    InlineBlot.prototype.merge = function (target) {
        if (target === void 0) { target = this.next; }
        if (!this.parent)
            return false;
        if (target instanceof InlineBlot &&
            isEqual(target.getFormat(), this.getFormat())) {
            var nextTarget = this.children.tail;
            target.moveChildren(this);
            target.remove();
            nextTarget.merge();
            return true;
        }
        return false;
    };
    InlineBlot.prototype.unwrap = function () {
        if (Object.keys(this.attributes).length) {
            this.replace(InlineBlot.blotName, true);
        }
        else {
            _super.prototype.unwrap.call(this);
        }
    };
    InlineBlot.prototype.wrap = function (name, value) {
        if (name === this.statics.blotName) {
            return this.replace(name, value);
        }
        else {
            var wrapper = _super.prototype.wrap.call(this, name, value);
            this.moveAttributes(wrapper);
            return wrapper;
        }
    };
    InlineBlot.blotName = 'inline';
    InlineBlot.tagName = 'SPAN';
    InlineBlot.compare = function (thisName, otherName) {
        return thisName <= otherName;
    };
    return InlineBlot;
})(format_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InlineBlot;
