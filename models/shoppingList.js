'use strict';

const _ = require('underscore');

const instanceMethodsDb = models => ({
    add: function(itemTypeId, quantity) {
        return models
            .shoppingListItem
            .create({
                shoppingListId: this.id,
                itemTypeId: itemTypeId,
                quantity: quantity
            });
    }
});

module.exports = (sequelize, DataTypes) => {
    const ShoppingList = sequelize.define("shoppingList", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                ShoppingList.hasMany(models.shoppingListItem);

                ShoppingList.Instance.prototype = _.extend(ShoppingList.Instance.prototype, instanceMethodsDb(models));
            }
        },
        instanceMethods: {
            toSimpleJSON: function() {
                return {
                    id: this.id.toString(),
                    name: this.name
                };
            }
        }
    });
    return ShoppingList;
};
