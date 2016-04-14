'use strict';

module.exports = function(sequelize, DataTypes) {
    var ShoppingList = sequelize.define("shoppingList", {
        name: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                ShoppingList.hasMany(models.shoppingListItem);
            }
        }
    });
    return ShoppingList;
};