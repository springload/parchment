var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var leaf_1 = require('./abstract/leaf');
var Registry = require('../registry');
var EmbedBlot = (function (_super) {
    __extends(EmbedBlot, _super);
    function EmbedBlot() {
        _super.apply(this, arguments);
    }
    EmbedBlot.prototype.getValue = function () {
        var value = _super.prototype.getValue.call(this);
        value[this.statics.blotName] = true;
        return value;
    };
    EmbedBlot.prototype.insertAt = function (index, value, def) {
        var blot = (def == null) ? Registry.create('text', value) : Registry.create(value, def);
        var ref = (index === 0) ? this : this.next;
        this.parent.insertBefore(blot, ref);
    };
    EmbedBlot.blotName = 'embed';
    return EmbedBlot;
})(leaf_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmbedBlot;
