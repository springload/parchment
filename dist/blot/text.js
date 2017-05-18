var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var leaf_1 = require('./abstract/leaf');
var inline_1 = require('./inline');
var Registry = require('../registry');
var TextBlot = (function (_super) {
    __extends(TextBlot, _super);
    function TextBlot(value) {
        if (typeof value === 'string') {
            _super.call(this, document.createTextNode(value));
        }
        else {
            _super.call(this, value);
        }
        this.text = this.domNode.data;
    }
    TextBlot.prototype.deleteAt = function (index, length) {
        this.text = this.text.slice(0, index) + this.text.slice(index + length);
        if (this.text.length > 0) {
            this.domNode.data = this.text;
        }
        else {
            this.remove();
        }
    };
    TextBlot.prototype.format = function (name, value) {
        if (Registry.match(name, Registry.Type.ATTRIBUTE) !== null) {
            var target = this.wrap(inline_1.default.blotName, true);
            target.format(name, value);
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    TextBlot.prototype.getLength = function () {
        return this.text.length;
    };
    TextBlot.prototype.getValue = function () {
        return this.text;
    };
    TextBlot.prototype.insertAt = function (index, value, def) {
        if (def == null) {
            this.text = this.text.slice(0, index) + value + this.text.slice(index);
            this.domNode.data = this.text;
        }
        else {
            _super.prototype.insertAt.call(this, index, value, def);
        }
    };
    TextBlot.prototype.merge = function (target) {
        if (target === void 0) { target = this.next; }
        if (target instanceof TextBlot) {
            this.text = this.text + target.text;
            this.domNode.data = this.text;
            target.remove();
            return true;
        }
        return false;
    };
    TextBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.getLength())
                return this.next;
        }
        var after = Registry.create(this.statics.blotName, this.domNode.splitText(index));
        this.parent.insertBefore(after, this.next);
        this.text = this.domNode.data;
        return after;
    };
    TextBlot.blotName = 'text';
    return TextBlot;
})(leaf_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextBlot;
