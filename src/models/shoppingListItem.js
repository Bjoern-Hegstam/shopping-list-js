'use strict';

export default (sequelize, DataTypes) => {
    const ShoppingListItem = sequelize.define("shoppingListItem", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
                    id: this.id.toString(),
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
