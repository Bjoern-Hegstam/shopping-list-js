var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

var ItemType = models.itemType;
var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;

module.exports = dbScaffolding;
dbScaffolding.shoppingListDbTest = {
    setUp: function(callback) {
        var self = this;

        ItemType.create({
            name: 'TestItemType'
        })
        .then(function (itemType) {
            self.itemType = itemType;
            callback();
        });
    },
    createEmptyShoppingList: function(test) {
        ShoppingList.create({
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

        ShoppingList.create({
            name: 'ShoppingList'
        })
        .then(function(shoppingList) {
            return ShoppingListItem.create({
                shoppingListId: shoppingList.id,
                itemType: self.itemType,
                quantity: '2'
            });
        })
        .then(function(shoppingListItem) {
            test.ok(shoppingListItem.id);
            test.done();
        });
    }
};