'use strict';

export default (sequelize, DataTypes) => sequelize.define("Session", {
    sid: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
});
