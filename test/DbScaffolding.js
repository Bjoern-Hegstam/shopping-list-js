var models = require('./../models');

module.exports = {
    setUp: function(callback) {
        models
        .sequelize
        .sync({force: true, match: /_test$/})
        .then(function() {
            callback();
        }, function(err) {
            throw err;
        });
    }
};