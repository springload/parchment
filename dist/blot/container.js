var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var block_1 = require('./block');
var parent_1 = require('./abstract/parent');
var Registry = require('../registry');
var ContainerBlot = (function (_super) {
    __extends(ContainerBlot, _super);
    function ContainerBlot() {
        _super.apply(this, arguments);
    }
    ContainerBlot.prototype.getBlocks = function () {
        return this.getDescendants(block_1.default);
    };
    ContainerBlot.prototype.getFormat = function () {
        return this.getBlocks().map(function (block) {
            return block.getFormat();
        });
    };
    ContainerBlot.prototype.getValue = function () {
        return this.getBlocks().map(function (block) {
            return block.getValue();
        });
    };
    ContainerBlot.prototype.insertAt = function (index, value, def) {
        if (this.children.length === 0) {
            var block = Registry.create('block');
            this.insertBefore(block);
        }
        _super.prototype.insertAt.call(this, index, value, def);
    };
    ContainerBlot.blotName = 'container';
    ContainerBlot.tagName = 'DIV';
    return ContainerBlot;
})(parent_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContainerBlot;
