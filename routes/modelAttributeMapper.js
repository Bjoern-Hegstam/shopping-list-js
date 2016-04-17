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
        shopping_list_id: item.shoppingListId.toString(),
        item_type_id: item.itemTypeId.toString(),
        quantity: item.quantity.toString(),
        in_cart: item.inCart.toString()
    };
};

module.exports = mappings;