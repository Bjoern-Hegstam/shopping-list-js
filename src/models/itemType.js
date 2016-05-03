'use strict';

export default (sequelize, DataTypes) => sequelize.define("itemType", {
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
