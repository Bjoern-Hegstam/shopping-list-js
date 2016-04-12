var models = require('./../models');

module.exports = {
    setUp: function(callback) {
        models
        .sequelize
        .sync({force: true})
        .then(function() {
            callback();
        }, function(err) {
            throw err;
        });
    }
};