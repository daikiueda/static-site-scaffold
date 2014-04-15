/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var MODE_DEBUG = false;

var chalk = require( "chalk" );

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
                    basePath: "css",
                    config: "css/config.rb"
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

        jsdoc : {
            main : {
                src: [ "js/**/*.js", "js/**/*.jsdoc" ], 
                options: {
                    configure: "configurations/jsdoc3.conf.json",
                    destination: "doc/js"
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
        },


        attention: {
            server: {
                options: {
                    message: [
                        "Server started at ",
                        chalk.underline.cyan(
                            "http://<%= connect.options.hostname %>:<%= connect.options.port %>/"
                        ),
                        "\n and File Watching ... " + chalk.inverse( " Ctrl + C " ) + " to exit."
                    ].join( "" ),
                    border: "thin",
                    borderColor: 'blue'
                }
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
        },


        prompt: {
            select_task: {
                options: {
                    questions: [
                        {
                            config: "selectedTask",
                            type: "list",
                            message: "What would you like to do?", 
                            default: "server",
                            choices: [
                                { name: "ファイル更新の監視とオートリロードの開始", value: "server" },
                                "---",
                                { name: "Sass/Compassのコンパイル", value: "css" },
                                { name: "JavaScriptのビルド", value: "js" },
                                { name: "HTMLの構文チェック", value: "htmllint" },
                                "---",
                                { name: "その他", value: null },
                                { name: "なんでもない", value: "" },
                            ]
                        },
                        {
                            config: "selectedTask",
                            type: "list",
                            message: "What would you like to do?", 
                            choices: [
                                { name: "HTMLの<title>，メタ情報の更新", value: "meta_excel" },
                                { name: "HTMLの生成", value: "meta_excel::generate" },
                                "---",
                                { name: "JSDocの生成", value: "jsdoc" },
                                "---",
                                { name: "なんでもない", value: "" }
                            ],
                            when: function( answer ){
                                return ( answer.selectedTask === null );
                            }
                        }
                    ]
                }
            }
        }
    } );


    // load all grunt tasks
    require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );
    grunt.loadNpmTasks( "grunt-attention" ); // なぜかmatchdepで捕捉されない。
    grunt.loadTasks( "tasks" );


    // register tasks
    grunt.registerTask( "build", [ "css", "js" ] );

    grunt.registerTask( "server", function(){
        if( !this.flags.skip_build ){
            grunt.task.run( [ "build" ] );
        }
        grunt.task.run( [ "connect", "open", "attention:server", "watch" ] );
    } );

    grunt.registerTask( "css", [ "compass" ] );

    grunt.registerTask( "js", [ "uglify", "replace:license_comment_format" ] );

    grunt.registerTask( "setup", [ "exec:bower_install" ] );

    //grunt.registerTask( "test", [ "mochaTest" ] );

    grunt.registerTask( "default", [ "prompt:select_task", "respond_to_task_select" ] );
};
