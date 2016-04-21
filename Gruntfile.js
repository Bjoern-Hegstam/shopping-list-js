module.exports = function(grunt) {
    var scriptPaths = [
        'Gruntfile.js',
        'app.js',
        'package.json',
        'models/*.js',
        'routes/*.js',
        'test/*.js'
    ];

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

        concurrent: {
            target: {
                tasks: [
                    ['env:dev', 'shell:nodemon'], 'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        watch: {
            scripts: {
                files: scriptPaths,
                tasks: 'jshint'
            },
            styles: {
                files: 'public/less/*.less',
                tasks: 'less'
            }
        },

        shell: {
            nodemon: {
                command: 'nodemon -e js,handlebars ./bin/www',
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
            all: scriptPaths,
            options: {
                jshintrc: '.jshintrc'
            }
        },

        wiredep: {
            task: {
                src: ['views/**/*.handlebars']
            }
        },

        less: {
            development: {
                files: {
                    "./public/css/styles.css": "./public/less/styles.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('test', ['env:test', 'nodeunit:all']);

    grunt.registerTask('default', 'concurrent');
};
