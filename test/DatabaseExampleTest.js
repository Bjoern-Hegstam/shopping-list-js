var models = require('./../models');

function forceSyncDb(onSuccess) {
    models
        .sequelize
        .sync({force: true})
        .then(function() {
            onSuccess();
        }, function(err) {
            throw err;
        });
}

module.exports = {
    setUp: forceSyncDb,
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