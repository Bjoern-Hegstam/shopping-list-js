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
                command: 'nodemon -e js,handlebars ./bin/www',
                options: {
                    stdout: true,
                    stderr: true
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

        jshint: {
            all: scriptPaths,
            options: {
                jshintrc: '.jshintrc'
            }
        },

        less: {
            development: {
                files: {
                    "./public/css/styles.css": "./public/less/styles.less"
                }
            }
        },

        nodeunit: {
            all: ['./test/**/*Test.js']
        },


        wiredep: {
            task: {
                src: ['views/**/*.handlebars']
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
