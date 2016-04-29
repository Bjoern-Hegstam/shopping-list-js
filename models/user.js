'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        toSimpleJSON: function() {
            return {
                id: this.id.toString(),
                name: this.username
            };
        }
    }
});