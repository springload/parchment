var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var attributor_1 = require('./attributor');
function camelize(name) {
    if (name.length === 0)
        return name;
    var parts = name.split('-');
    var rest = parts.slice(1).map(function (part) {
        if (part.length == 0)
            return part;
        return part[0].toUpperCase() + part.slice(1);
    }).join('');
    return parts[0] + rest;
}
var StyleAttributor = (function (_super) {
    __extends(StyleAttributor, _super);
    function StyleAttributor() {
        _super.apply(this, arguments);
    }
    StyleAttributor.prototype.add = function (node, value) {
        node.style[camelize(this.keyName)] = value;
    };
    StyleAttributor.prototype.remove = function (node) {
        node.style[camelize(this.keyName)] = '';
        if (!node.getAttribute('style')) {
            node.removeAttribute('style');
        }
    };
    StyleAttributor.prototype.value = function (node) {
        return node.style[camelize(this.keyName)];
    };
    return StyleAttributor;
})(attributor_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StyleAttributor;
