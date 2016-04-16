var models = require('./../models');

var mappings = {};

mappings[models.itemType.name] = function(itemType) {
    return {
        name: itemType.name
    };
};

module.exports = mappings;