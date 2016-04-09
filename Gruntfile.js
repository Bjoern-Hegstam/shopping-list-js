module.exports = function (grunt) {
	grunt.initConfig({
		nodeunit: {
			all: ['./test/*Test.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
};