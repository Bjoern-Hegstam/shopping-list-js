'use strict';

module.exports = function(sequelize, DataTypes) {
	var ItemType = sequelize.define("ItemType", {
		name: DataTypes.STRING
	});

	return ItemType;
};