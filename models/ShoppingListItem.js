'use strict';

module.exports = function(sequelize, DataTypes) {
    var ShoppingListItem = sequelize.define("shoppingListItem", {
        quantity: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                ShoppingListItem.hasOne(models.itemType);
                ShoppingListItem.belongsTo(models.shoppingList);
            }
        }
    });
    return ShoppingListItem;
};