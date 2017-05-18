var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var blot_1 = require('./blot');
var LeafBlot = (function (_super) {
    __extends(LeafBlot, _super);
    function LeafBlot() {
        _super.apply(this, arguments);
    }
    LeafBlot.prototype.getFormat = function () {
        return {};
    };
    LeafBlot.prototype.getValue = function () {
        return {};
    };
    LeafBlot.blotName = 'leaf';
    return LeafBlot;
})(blot_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeafBlot;
