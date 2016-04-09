var db = require('./../app/SequelizeDatabase').connectToDb();

module.exports.testDb = function(test) {
	db.query('select name from sqlite_master where type = "table"').then(function (results) {
		console.log('Tables: ' + results);
		test.done();
	});
}
