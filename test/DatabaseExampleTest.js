var models = require('./../models');
var dbScaffolding = require('./DbScaffolding');

module.exports = dbScaffolding;
dbScaffolding.databaseExampleTest = {
    test: function(test) {
        models
        .ItemType
        .findAll()
        .then(function(itemTypes) {
            test.equal(itemTypes.length, 0, 'Num existing item types');

            models
            .ItemType
            .create({
                name: 'TestItemType42'
            })
            .then(function(itemType) {
                models
                .ItemType
                .findAll()
                .then(function(postItemTypes) {
                    test.equal(1, postItemTypes.length);
                    test.done();
                });
            });
        });
    }
};