'use strict';

module.exports = function(sequelize, DataTypes) {
    var ShoppingListItem = sequelize.define("ShoppingListItem", {
        quantity: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                ShoppingListItem.hasOne(models.ItemType, {foreignKey: 'itemTypeId'});
                ShoppingListItem.belongsTo(models.ShoppingList, {foreignKey: 'shoppingListId'});
            }
        }
    });
    return ShoppingListItem;
};