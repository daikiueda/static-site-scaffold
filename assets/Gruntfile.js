/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var MODE_DEBUG = false;

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
            css: {
                files: [ "css/**/*.scss" ],
                tasks: [ "css" ]
            },
            js: {
                files: [ "js/**/*.js" ],
                tasks: [ "js" ]
            }
        },

        htmllint: {
            main: {
                src: [
                    "../htdocs/**/*.html",
                    "!../htdocs/__modules/**/*.html",
                ]
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

        uglify: {
            options: {
                beautify: MODE_DEBUG,
                compress: {
                    global_defs: {
                        DEBUG: MODE_DEBUG
                    },
                    dead_code: true
                },
                preserveComments: "some"
            },
            libs: {
                src: [
                    "bower_components/jquery/dist/jquery.js"
                ],
                dest: "../htdocs/common/js/libs.js"
            },
            common: {
                src: [
                    "js/common/$.namespace.js",
                    "js/common/**/*.js"
                ],
                dest: "../htdocs/common/js/common.js"
            }
        },

        replace: {
            license_comment_format: {
                src: [ "../htdocs/common/js/libs.js" ],
                overwrite: true,
                replacements: [
                    { from: /\/\*\!/g, to: "\n/*!" },
                    { from: /^\n+\/\*\!/g, to: "/*!" }
                ]
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
        },

        exec: {
            bower_install: {
                cmd: "bower install",
                stdout: false,
                stderr: false,
                callback: function( error, stdout, stderr ){
                    if( stdout === "" && stderr === "" ){
                        grunt.log.ok( "All Components have been installed." );
                    }

                    if( error && error.code === 127 ){
                        grunt.log.error( "bowerがみつかりません。インストール状況を確認してください。" );
                        return;
                    }

                    stdout.split( /\n/ ).forEach( function( log ){
                        if( /\s{2,}/.test( log ) ) grunt.log.writeln( log.replace( /^.+\s{2,}/, " * " ) );
                        if( /^\S+\s\S+$/.test( log ) ) grunt.log.ok( log.replace( /\s\S+$/, "" ) );
                    } );
                    stderr.split( /\n/ ).forEach( function( err ){
                        if( /\s{2,}/.test( err ) ) grunt.log.error( err.replace( /\s{2,}/, "\n" ) );
                    } );
                }
            }
        }
    } );


    // load all grunt tasks
    require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );
    grunt.loadTasks('tasks');


    // register tasks
    grunt.registerTask( "build", [ "css", "js" ] );

    grunt.registerTask( "server", function(){
        if( !this.flags.skip_build ){
            grunt.task.run( [ "build" ] );
        }
        grunt.task.run( [ "connect", "open", "watch" ] );
    } );

    grunt.registerTask( "css", [ "compass" ] );

    grunt.registerTask( "js", [ "uglify", "replace:license_comment_format" ] );

    grunt.registerTask( "setup", [ "exec:bower_install" ] );

    //grunt.registerTask( "test", [ "mochaTest" ] );

    grunt.registerTask( "default", [ "build" ] );
};
