'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("itemType", {
		name: DataTypes.STRING
	});
};