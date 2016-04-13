var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

var ItemType = models.itemType;

module.exports = dbScaffolding;
dbScaffolding.itemTypeModelTest = {
    createAndVerifyItemType: function(test) {
        ItemType.create({
            name: 'TestItemType42'
        })
        .then(function verify(itemType) {
            test.ok(itemType.id);
            test.equal(itemType.name, 'TestItemType42');
            test.done();
        });
    }
};
