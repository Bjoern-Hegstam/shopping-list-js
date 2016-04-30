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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    role: {
        type: DataTypes.Enum('USER', 'ADMIN'),
    }
}, {
    instanceMethods: {
        toSimpleJSON: function() {
            return {
                id: this.id.toString(),
                name: this.username,
                email: this.email,
                confirmed: this.confirmed.toString(),
                role: this.role
            };
        }
    },
    setterMethods: {
        password: function(value) {
            this.setDataValue('salt', 'mySalt');
            this.setDataValue('password', value);
        }
    }
});