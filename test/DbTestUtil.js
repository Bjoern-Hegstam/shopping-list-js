var models = require('./../models');

module.exports = {
    init: function(onSuccess) {
        models
        .sequelize
        .sync({force: true})
        .then(function() {
            onSuccess();
        }, function(err) {
            throw err;
        });
    }
};