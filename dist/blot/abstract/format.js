var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var blot_1 = require('./blot');
var parent_1 = require('./parent');
var Registry = require('../../registry');
var FormatBlot = (function (_super) {
    __extends(FormatBlot, _super);
    function FormatBlot(value) {
        this.attributes = {};
        _super.call(this, value);
    }
    FormatBlot.prototype.build = function () {
        var _this = this;
        _super.prototype.build.call(this);
        if (!(this.domNode instanceof HTMLElement))
            return;
        var attributes = [], classes = [], styles = [];
        Array.prototype.slice.call(this.domNode.attributes).forEach(function (item) {
            if (item.name === 'class') {
                classes = item.value.split(/\s+/);
            }
            else if (item.name === 'style') {
                styles = item.value.split(';').map(function (val) {
                    var arr = val.split(':');
                    return arr[0].trim();
                });
            }
            else {
                attributes.push(item.name);
            }
        });
        attributes.concat(classes).concat(styles).forEach(function (name) {
            var attr = Registry.match(name, Registry.Type.ATTRIBUTE);
            if (attr != null) {
                _this.attributes[attr.attrName] = attr;
            }
        });
    };
    FormatBlot.prototype.format = function (name, value) {
        if (Registry.match(name, Registry.Type.ATTRIBUTE) != null) {
            if (value) {
                this.attributes[name] = Registry.match(name, Registry.Type.ATTRIBUTE);
                this.attributes[name].add(this.domNode, value);
            }
            else if (this.attributes[name] != null) {
                this.attributes[name].remove(this.domNode);
            }
            if (this.attributes[name] && !this.attributes[name].value(this.domNode)) {
                // Add falsy value may end up removing
                delete this.attributes[name];
            }
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    FormatBlot.prototype.getFormat = function () {
        var _this = this;
        var formats = Object.keys(this.attributes).reduce(function (formats, name) {
            if (_this.domNode instanceof HTMLElement) {
                formats[name] = _this.attributes[name].value(_this.domNode);
            }
            return formats;
        }, _super.prototype.getFormat.call(this));
        if (blot_1.DEFAULT_SCOPE.indexOf(this.statics.blotName) < 0) {
            formats[this.statics.blotName] = Array.isArray(this.statics.tagName) ? this.domNode.tagName.toLowerCase() : true;
        }
        return formats;
    };
    FormatBlot.prototype.moveAttributes = function (target) {
        var _this = this;
        Object.keys(this.attributes).forEach(function (key) {
            var value = _this.attributes[key].value(_this.domNode);
            target.format(key, value);
            _this.format(key, false);
        });
    };
    FormatBlot.prototype.replace = function (name, value) {
        var replacement = _super.prototype.replace.call(this, name, value);
        this.moveAttributes(replacement);
        return replacement;
    };
    return FormatBlot;
})(parent_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormatBlot;
