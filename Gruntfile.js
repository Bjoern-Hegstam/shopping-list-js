module.exports = function(grunt) {
    var serverScriptPaths = [
        'src/app.js',
        'src/models/*.js',
        'src/routes/*.js',
    ];

    var scriptPaths = [
        'Gruntfile.js',
        'src/app.js',
        'package.json',
        'src/models/*.js',
        'src/routes/*.js',
        'test/**/*.js',
        'public/js/**/*.js'
    ];

    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: [
                    ['env:dev', 'shell:nodemon'], 'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },

            apitest: {
                tasks: [
                    ['env:test', 'shell:nodemon'], 'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        env: {
            dev: {
                NODE_ENV: 'development',
                DEBUG: 'nodetest:server models:index login'
            },

            test: {
                NODE_ENV: 'test',
                DEBUG: '',
                USER_AUTH_DISABLED: true
            }
        },

        shell: {
            nodemon: {
                command: 'nodemon -e js,handlebars dist/bin/server.js',
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

            babel: {
                files: serverScriptPaths,
                tasks: 'babel'
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
                    "public/css/styles.css": "public/less/styles.less"
                }
            }
        },

        nodeunit: {
            all: ['test/**/*Test.js']
        },


        wiredep: {
            task: {
                src: ['views/**/*.handlebars']
            }
        },

        babel: {
            options: {
                babelrc: '.babelrc'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            views: {
                files: [{
                    expand: true,
                    src: ['views/**'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('test', 'nodeunit:all');
    grunt.registerTask('apitest', 'concurrent:apitest');

    grunt.registerTask('build', ['babel', 'less', 'wiredep', 'copy:views']);
    grunt.registerTask('default', 'concurrent:dev');
};
