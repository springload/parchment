var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var format_1 = require('./abstract/format');
var leaf_1 = require('./abstract/leaf');
var Registry = require('../registry');
var BlockBlot = (function (_super) {
    __extends(BlockBlot, _super);
    function BlockBlot() {
        _super.apply(this, arguments);
    }
    BlockBlot.prototype.format = function (name, value) {
        var blot = Registry.match(name, Registry.Type.BLOT);
        if (blot != null && blot.prototype instanceof BlockBlot) {
            if (value) {
                this.replace(name, value);
            }
            else {
                this.replace(BlockBlot.blotName, true);
            }
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    BlockBlot.prototype.getLeaves = function () {
        return this.getDescendants(leaf_1.default);
    };
    BlockBlot.prototype.getValue = function () {
        return [].concat.apply([], this.getLeaves().map(function (leaf) {
            return leaf.getValue();
        }));
    };
    BlockBlot.blotName = 'block';
    BlockBlot.tagName = 'P';
    return BlockBlot;
})(format_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlockBlot;
