module.exports = function (grunt) {
	grunt.initConfig({
        env: {
            test: {
                NODE_ENV: 'test',
                DEBUG: ''
            }
        },
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

    grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['env:test', 'nodeunit:all']);
};