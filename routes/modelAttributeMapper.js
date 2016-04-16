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

mappings[models.shoppingListItem.name] = function(item) {
    return {
        shoppingListId: item.shoppingListId.toString(),
        itemTypeId: item.itemTypeId.toString(),
        quantity: item.quantity.toString()
    };
};

module.exports = mappings;