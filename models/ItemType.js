'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ItemType", {
		name: DataTypes.STRING
	});
};