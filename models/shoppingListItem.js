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
                    shopping_list_id: this.shoppingListId,
                    item_type_id: this.itemTypeId,
                    quantity: this.quantity,
                    in_cart: this.inCart
                };
            }
        }
    });
    return ShoppingListItem;
};
