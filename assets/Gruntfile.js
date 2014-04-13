/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

module.exports = function( grunt ){

    grunt.initConfig( {

        connect: {
            options: {
                port: 8000,
                hostname: "localhost"
            },
            livereload: {
                options: {
                    base: "../htdocs",
                    livereload: true
                }
            }
        },
        open: {
            main: {
                path: "http://<%= connect.options.hostname %>:<%= connect.options.port %>"
            }
        },

        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            scss: {
                files: [ "css/**/*.scss" ],
                tasks: [ "compass" ]
            }
        },

        compass: {
            main: {
                options: {
                    basePath: 'css',
                    config: 'css/config.rb'
                }
            }
        },

        meta_excel: {
            options: {
                dataStartingRow: 7,
                mapping: {
                    path: "E",
                    title: "F",
                    title_all: "G",
                    description: "I",
                    keywords: "K",
                    url: "M",
                    thumbnail: "N"
                }
            },
            main: {
                xlsx: "metadata/sitemap.xlsm",
                htmlDir: "../htdocs/",
                options: {
                    boilerplate: "../htdocs/__modules/__boilerplate.html"
                }
            }
        }
    } );


    // load all grunt tasks
    require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );
    grunt.loadTasks('tasks');


    grunt.registerTask( "server", [ "connect", "open", "watch" ] );


//    grunt.registerTask( "test", [ "mochaTest" ] );
//    grunt.registerTask( "default", [ "jshint", "test" ] );
};
