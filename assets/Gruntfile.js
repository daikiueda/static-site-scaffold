/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var MODE_DEBUG = false;

var chalk = require( "chalk" );

function hasModele( moduleName ){
    var module;
    try { module = require.resolve( moduleName ); } catch( e ){}
    return ( module )? true: false;
}

module.exports = function( grunt ){

    grunt.initConfig( {

        connect: {
            livereload: {
                options: {
                    port: 8000,
                    hostname: "localhost",
                    base: "../htdocs",
                    livereload: true
                }
            },

            for_test_runner: {
                options: {
                    port: 8001,
                    hostname: "localhost",
                    base: "."
                }
            }
        },
        open: {
            main: {
                path: [
                    "http://<%= connect.livereload.options.hostname %>",
                    ":<%= connect.livereload.options.port %>"
                ].join( "" )
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

        template: {
            test_runner: {
                options: {
                    data: {
                        libsFiles: grunt.file.expand( [
                            "bower_components/jquery/dist/jquery.js"
                        ] ),
                        jsSrcFiles: grunt.file.expand( [
                            "js/common/$.namespace.js",
                            "js/common/**/*.js",
                            "js/**/*.js"
                        ] ),
                        testFiles: grunt.file.expand( [
                            "test/**/*.js",
                            "!test/**/*.browserify.js",
                            "!test/**/karma*.browserify.js"
                        ] )
                    }
                },
                files: {
                    "test/tmp.runner.html": "test/runner.tmpl.html"
                }
            }
        },

        karma: {
            common: {
                configFile: "test/karma.conf.js"
            }
        },

        browserify: {
            common: {
                files: {
                    "test/tmp/common/siteScript/testem.common.browserified.js": [
                        "test/common/siteScript/**/*browserify*.js"
                    ],
                    "test/tmp/common/siteScript/karma.common.browserified.js": [
                        "test/common/siteScript/**/*browserify*.js"
                    ]
                }
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
                xlsx: "doc/sitemap.xlsm",
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
                            "http://<%= connect.livereload.options.hostname %>:<%= connect.livereload.options.port %>/"
                        ),
                        "\n and File Watching ... " + chalk.inverse( " Ctrl + C " ) + " to exit."
                    ].join( "" ),
                    border: "thin",
                    borderColor: 'blue'
                }
            },

            cross_browsers_test: {
                options: {
                    message: [
                        "For Cross-Browser testing, ",
                        hasModele( "testem" ) ?
                            "run \"testem\"!\n" + chalk.inverse( " npm run testem " ):
                            "install \"testem\"!\n" + chalk.inverse( " npm install testem -g " )
                    ].join( "" )
                }
            }
        },

        cat: {
            coverage: { src: "test/tmp/__coverage/*/coverage.txt" }
        },
        

        clean: {
            test: [ "test/tmp" ]
        },

        replace: {
            license_comment_format: {
                src: [ "../htdocs/common/js/libs.js" ],
                overwrite: true,
                replacements: [
                    { from: /\/\*\!/g, to: "\n/*!" },
                    { from: /^\n+\/\*\!/g, to: "/*!" }
                ]
            },

            path_in_browserified_for_karma: {
                src: [ "test/tmp/**/karma*browserified*.js" ],
                overwrite: true,
                replacements: [
                    { from: /<script src="\//g, to: "<script src=\"/base/" }
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
                                { name: "メニューの終了", value: "" },
                            ]
                        },
                        {
                            config: "selectedTask",
                            type: "list",
                            message: "Other menu.", 
                            choices: [
                                { name: "HTMLの<title>，メタ情報の更新", value: "meta_excel" },
                                { name: "HTMLの生成", value: "meta_excel::generate" },
                                "---",
                                { name: "JSDocの生成", value: "jsdoc" },
                                "---",
                                { name: "戻る", value: "task_menu" },
                                { name: "メニューの終了", value: "" }
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
        grunt.task.run( [
            "connect:livereload",
            "open",
            "attention:server",
            "watch"
        ] );
    } );

    grunt.registerTask( "css", [ "compass" ] );

    grunt.registerTask( "js", [ "uglify", "replace:license_comment_format" ] );

    grunt.registerTask( "setup", [ "exec:bower_install" ] );

    grunt.registerTask( "test", [
        "clean:test",
        "browserify:common",
        "replace:path_in_browserified_for_karma",
//        "template:test_runner",

//        "connect:for_test_runner",
//        "attention:cross_browsers_test",
        "karma:common",
        "cat:coverage"
    ] );

    grunt.registerTask( "task_menu", [ "prompt:select_task", "respond_to_task_select" ] );

    grunt.registerTask( "default", [ "task_menu" ] );
};
