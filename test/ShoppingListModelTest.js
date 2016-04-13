var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

module.exports = dbScaffolding;
dbScaffolding.shoppingListDbTest = {
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
    }
};