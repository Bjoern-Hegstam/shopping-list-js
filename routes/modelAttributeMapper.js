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
        shoppingListId: item.shoppingListId,
        itemTypeId: item.itemTypeId,
        quantity: item.quantity
    };
}

module.exports = mappings;