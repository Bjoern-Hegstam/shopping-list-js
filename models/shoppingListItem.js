'use strict';

module.exports = function(sequelize, DataTypes) {
    var ShoppingListItem = sequelize.define("shoppingListItem", {
        quantity: DataTypes.INTEGER,
        inCart: DataTypes.BOOLEAN
    },{
        classMethods: {
            associate: function(models) {
                ShoppingListItem.belongsTo(models.itemType);
                ShoppingListItem.belongsTo(models.shoppingList);
            }
        }
    });
    return ShoppingListItem;
};