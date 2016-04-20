var models = require('./../models');

var mappings = {};

mappings[models.itemType.name] = function(itemType) {
    return itemType.toSimpleJSON();
};

mappings[models.shoppingList.name] = function(shoppingList) {
    return shoppingList.toSimpleJSON();
};

mappings[models.shoppingListItem.name] = function(item) {
    return item.toSimpleJSON();
};

module.exports = mappings;