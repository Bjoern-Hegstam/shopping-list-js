'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("itemType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        instanceMethods: {
            toSimpleJSON: function() {
                return {
                    id: this.id,
                    name: this.name
                };
            }
        }
    });
};
