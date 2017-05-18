var attributes = {};
var classes = {};
var tags = {};
var types = {};
exports.PREFIX = 'blot-';
(function (Type) {
    Type[Type["ATTRIBUTE"] = 1] = "ATTRIBUTE";
    Type[Type["BLOT"] = 2] = "BLOT";
})(exports.Type || (exports.Type = {}));
var Type = exports.Type;
function create(name, value) {
    var BlotClass = match(name, Type.BLOT);
    if (typeof BlotClass !== 'function') {
        throw new Error("[Parchment] Unable to create " + name);
    }
    if (typeof name === 'string') {
        return new BlotClass(value);
    }
    else {
        return new BlotClass(name);
    }
}
exports.create = create;
function match(query, type) {
    if (type === void 0) { type = Type.BLOT; }
    if (typeof query === 'string') {
        var match_1 = types[query] || attributes[query];
        if (match_1 == null)
            return match_1;
        // Check type mismatch
        if (type === Type.BLOT) {
            return typeof match_1.blotName === 'string' ? match_1 : null;
        }
        else if (type === Type.ATTRIBUTE) {
            return typeof match_1.attrName === 'string' ? match_1 : null;
        }
        else {
            return match_1;
        }
    }
    else if (query instanceof Node && type === Type.BLOT) {
        if (query instanceof HTMLElement) {
            var names = query.className.split(' ');
            for (var i in names) {
                if (names[i].indexOf(exports.PREFIX) === 0) {
                    return types[names[i].slice(exports.PREFIX.length)];
                }
            }
            return tags[query.tagName];
        }
        else if (query instanceof Text) {
            return types['text'];
        }
    }
    return null;
}
exports.match = match;
// Only support real classes since calling superclass definitions are so important
function register(Definition) {
    if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
        throw new Error('[Parchment] Invalid definition');
    }
    types[Definition.blotName || Definition.attrName] = Definition;
    if (typeof Definition.tagName === 'string') {
        tags[Definition.tagName.toUpperCase()] = Definition;
    }
    else if (Array.isArray(Definition.tagName)) {
        Definition.tagName.forEach(function (tag) {
            tags[tag.toUpperCase()] = Definition;
        });
    }
    else if (typeof Definition.keyName === 'string') {
        attributes[Definition.keyName] = Definition;
    }
    return Definition;
}
exports.register = register;
