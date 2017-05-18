var blot_1 = require('./blot/abstract/blot');
var block_1 = require('./blot/block');
var embed_1 = require('./blot/embed');
var leaf_1 = require('./blot/abstract/leaf');
var inline_1 = require('./blot/inline');
var container_1 = require('./blot/container');
var text_1 = require('./blot/text');
var style_1 = require('./attributor/style');
var Registry = require('./registry');
var Parchment = {
    PREFIX: Registry.PREFIX,
    Container: container_1.default,
    Block: block_1.default,
    Inline: inline_1.default,
    Leaf: leaf_1.default,
    Embed: embed_1.default,
    Style: style_1.default,
    create: Registry.create,
    match: Registry.match,
    register: Registry.register,
    Type: Registry.Type,
    findBlot: blot_1.default.findBlot
};
Parchment.register(container_1.default);
Parchment.register(block_1.default);
Parchment.register(inline_1.default);
Parchment.register(text_1.default);
module.exports = Parchment;
