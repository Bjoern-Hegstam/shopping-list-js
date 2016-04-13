module.exports = function (grunt) {
	grunt.initConfig({
		nodeunit: {
			all: ['./test/**/*Test.js']
		},
        jshint: {
            all: [
            'Gruntfile.js',
            'app.js',
            'package.json',
            'models/*.js',
            'routes/*.js',
            'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};