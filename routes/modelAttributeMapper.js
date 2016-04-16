var models = require('./../models');

var mappings = {};

mappings[models.itemType.name] = function(itemType) {
    return {
        name: itemType.name
    };
};

mappings[models.shoppingList.name] = function(shoppingList) {
    return {
        name: shoppingList.name
    };
};

module.exports = mappings;