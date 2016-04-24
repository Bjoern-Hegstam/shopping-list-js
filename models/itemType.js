'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("itemType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        instanceMethods: {
            toSimpleJSON: function() {
                return {
                    id: this.id.toString(),
                    name: this.name
                };
            }
        }
    });
};
