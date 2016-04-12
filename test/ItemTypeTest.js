var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

module.exports = dbScaffolding;
dbScaffolding.databaseExampleTest = {
    createAndVerifyItemType: function(test) {
        models
        .ItemType
        .create({
            name: 'TestItemType42'
        })
        .then(function verify(itemType) {
            test.ok(itemType.id);
            test.equal(itemType.name, 'TestItemType42');
            test.done();
        });
    }
};
