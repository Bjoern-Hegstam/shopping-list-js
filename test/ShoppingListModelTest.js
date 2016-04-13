var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

module.exports = dbScaffolding;
dbScaffolding.shoppingListDbTest = {
    setUp: function(callback) {
        var self = this;
        models
        .ItemType
        .create({
            name: 'TestItemType'
        })
        .then(function (itemType) {
            self.itemType = itemType;
            callback();
        });
    },
    createEmptyShoppingList: function(test) {
        models
        .ShoppingList
        .create({
            name: 'TestShoppingList',
        })
        .then(function verify(shoppingList) {
            test.ok(shoppingList.id);
            test.equal(shoppingList.name, 'TestShoppingList');
            test.done();
        });
    },
    addItemToShoppingList: function(test) {
        var self = this;

        models
        .ShoppingList
        .create({
            name: 'ShoppingList'
        })
        .then(function(shoppingList) {
            return models
            .ShoppingListItem
            .create({
                shoppingListId: shoppingList.id,
                itemType: self.itemType,
                quantity: '2'
            })
        })
        .then(function(shoppingListItem) {
            test.ok(shoppingListItem.id);
            test.done();
        });
    }
};