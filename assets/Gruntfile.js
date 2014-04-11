/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var LIVERELOAD_PORT = 35729,
    lrSnippet = require( "connect-livereload" )( { port: LIVERELOAD_PORT } ),
    mountFolder = function( connect, dir ){
        return connect.static( require( "path" ).resolve( dir ) );
    };

module.exports = function( grunt ){

    grunt.initConfig( {

        connect: {
            options: {
                port: 8000,
                hostname: "localhost"
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder( connect, '../htdocs' )
                        ];
                    }
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
                livereload: LIVERELOAD_PORT
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
