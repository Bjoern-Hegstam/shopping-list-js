module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development',
                DEBUG: 'nodetest:server models:index'
            },
            test: {
                NODE_ENV: 'test',
                DEBUG: ''
            }
        },
        shell: {
            nodemon: {
                command: 'nodemon -e handlebars ./bin/www',
                options: {
                    stdout: true,
                    stderr: true
                }
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
        },
        wiredep: {
            task: {
                src: ['views/**/*.handlebars']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('test', ['env:test', 'nodeunit:all']);
    grunt.registerTask('dev', ['env:dev', 'shell:nodemon']);
};