var Attributor = (function () {
    function Attributor(attrName, keyName) {
        this.attrName = attrName;
        this.keyName = keyName;
    }
    Attributor.prototype.add = function (node, value) {
        node.setAttribute(this.keyName, value);
    };
    Attributor.prototype.remove = function (node) {
        node.removeAttribute(this.keyName);
    };
    Attributor.prototype.value = function (node) {
        return node.getAttribute(this.keyName);
    };
    return Attributor;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Attributor;
