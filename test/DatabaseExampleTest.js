var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

module.exports = dbScaffolding;
dbScaffolding.databaseExampleTest = {
    createAndVerifyItemType: function(test) {
        createItemType({
            name: 'TestItemType42'
        },
        function verify(itemType) {
            test.ok(itemType.id);
            test.equal(itemType.name, 'TestItemType42');
            test.done();
        });
    }
};

function createItemType(values, callback) {
    models
    .ItemType
    .create(values)
    .then(callback);
}