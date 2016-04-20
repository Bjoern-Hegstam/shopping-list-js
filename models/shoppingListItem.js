'use strict';

module.exports = function(sequelize, DataTypes) {
    var ShoppingListItem = sequelize.define("shoppingListItem", {
        quantity: DataTypes.INTEGER,
        inCart: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                ShoppingListItem.belongsTo(models.itemType);
                ShoppingListItem.belongsTo(models.shoppingList);
            }
        },
        instanceMethods: {
            toSimpleJSON: function() {
                return {
                    id: this.id,
                    shopping_list_id: this.shoppingListId.toString(),
                    item_type_id: this.itemTypeId.toString(),
                    quantity: this.quantity.toString(),
                    in_cart: this.inCart.toString()
                };
            }
        }
    });
    return ShoppingListItem;
};
