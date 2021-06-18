const sass = require('node-sass');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/www-tmp/typescript-dist/index.js',
                dest: 'build/www/scripts/index.min.js'
            }
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'build/www-tmp/sass-dist/style.css': 'src/main/www/style/style.scss'
                }
            }
        },

        ts: {
            default : {
                tsconfig: './tsconfig.json'
            }
        },
        postcss: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                map: true,
                processors: [
                    require("css-mqpacker")(),
                    require('autoprefixer')(),
                ]
            },
            dev: {
                src: 'build/www-tmp/sass-dist/style.css',
                dest: 'build/www/style/style.min.css'
            },
            prod: {
                options: {
                    map: false
                },
                src: 'build/www-tmp/sass-dist/style.css',
                dest: 'build/www/style/style.min.css'
            }
        },
        'compile-handlebars': {
            allStatic: {
                files: [{
                    src: 'src/main/www/index.hbs',
                    dest: 'build/www/index.html'
                }],
                templateData: 'test/fixtures/data.json'
            },
        },
    });

    grunt.registerMultiTask("hbs", ["compile handlebars", ], handleBarsTask)

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-compile-handlebars');

    grunt.registerTask('style', ['sass', 'postcss'])
    grunt.registerTask('scripts', ['ts', 'uglify'])
    grunt.registerTask('html', ['compile-handlebars'])

    // Default task(s).
    grunt.registerTask('all', ['scripts', 'style', 'html']);
    grunt.registerTask('default', ['all']);

};

function handleBarsTask() {

}