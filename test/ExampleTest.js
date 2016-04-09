module.exports = {
	setUp: function(callback) {
		console.log('setUp - Outer');
		callback();
	},
	tearDown: function(callback) {
		console.log('tearDown - Outer');
		callback();
	},
	test1: function (test) {
		console.log('test - Outer');
		test.ok(5);
		test.done();
	},
	group1: {
		setUp: function(callback) {
			console.log('setUp - Inner');
			callback();
		},
		tearDown: function(callback) {
			console.log('tearDown - Inner');
			callback();
		},
		test1: function (test) {
			console.log('test - Inner');
			test.ok(5);
			test.done();
		},
	}
};