var Sequelize = require('sequelize');

exports.connectToDb = function () {
	return new Sequelize('database', 'username', 'password', {
		dialect: 'sqlite',
		storage: __dirname + '/../database.sqlite',
		logging: false
	});
}
