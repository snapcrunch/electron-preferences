'use strict';

module.exports = (grunt) => {

    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        'compass': {
            'all': {
                'options': {
                    'httpPath': '/',
                    'cssDir': 'build',
                    'sassDir': 'scss',
                    'specify': [
                        'scss/style.scss'
                    ],
                    'imagesDir': 'build/images',
                    'relativeAssets': true,
                    'outputStyle': 'compressed',
                    'importPath': [
                        'node_modules'
                    ]
                }
            }
        },
        'copy': {
            'assets': {
                'expand': true,
                'cwd': 'assets',
                'src': '**',
                'dest': 'build'
            }
        },
        'watch': {
            'scss': {
                'files': 'scss/**/*',
                'tasks': ['compass', 'webpack:watch'],
                'options': {
                    'interrupt': true,
                    'atBegin': true
                }
            }
        },
        'webpack': {
            'options': {
                'progress': true,
                'stats': {
                    'errorDetails': true
                },
                'storeStatsTo': 'webpackStats'
            },
            'once': require('./webpack.config.js'),
            'watch': Object.assign({ 'watch': true, 'keepalive': true }, require('./webpack.config.js'))
        },
        'concurrent': {
            'options': {
                'limit': 3,
                'logConcurrentOutput': true
            },
            'build-watch': {
                'tasks': [
                    'webpack:watch', 'watch'
                ]
            }
        }
    });

    grunt.registerTask('build', ['copy', 'compass', 'webpack:once']);
    grunt.registerTask('build-watch', ['copy', 'compass', 'watch']);

};
