'use strict';

var _ = require('underscore');

var instanceMethodsDb = function(models) {
    return {
        add: function(itemTypeId, quantity) {
            return models
                .shoppingListItem
                .create({
                    shoppingListId: this.id,
                    itemTypeId: itemTypeId,
                    quantity: quantity
                });
        }
    };
};

module.exports = function(sequelize, DataTypes) {
    var ShoppingList = sequelize.define("shoppingList", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                ShoppingList.hasMany(models.shoppingListItem);

                ShoppingList.Instance.prototype = _.extend(ShoppingList.Instance.prototype, instanceMethodsDb(models));
            }
        }
    });
    return ShoppingList;
};