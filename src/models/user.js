'use strict';

import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
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
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        allowNull: false
    }
}, {
    instanceMethods: {
        toSimpleJSON: function() {
            return {
                id: this.id.toString(),
                name: this.username,
                email: this.email,
                verified: this.verified.toString(),
                role: this.role
            };
        },

        isCorrectPassword: function(value) {
            return bcrypt.compareSync(value, this.password);
        }
    },
    setterMethods: {
        password: function(value) {
            this.setDataValue('password', bcrypt.hashSync(value));
        }
    }
});
