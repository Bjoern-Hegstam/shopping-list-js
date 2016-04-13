'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ShoppingList", {
        name: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models) {
                models
                .ShoppingList
                .hasMany(models.ShoppingListItem, {foreignKey: 'shoppingListId'});
            }
        }
    });
};