/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var MODE_DEBUG = false;

var _ = require( "lodash" ),
    chalk = require( "chalk" );

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


        webfont: {
            common_icons: {
                src: "font-svg/icon/*.svg",
                dest: "../htdocs/common/fonts/icon",
                destCss: "css/common/css/design_schemes",
                options: {
                    engine: "node",
                    font: "icon",
                    hashes: false,
                    stylesheet: "scss",
                    relativeFontPath: "../fonts/icon",
                    template: "font-svg/icon/icon.css",
                    htmlDemo: false,
                    embed: false
                }
            }
        },

        compass: {
            main: {
                options: {
                    basePath: "css",
                    config: "css/config.rb",
                    environment: "production"
                }
            },
            main_for_cssdoc: {
                options: {
                    basePath: "<%= compass.main.options.basePath %>",
                    config: "<%= compass.main.options.config %>",
                    environment: "development"
                }
            },
            main_clean: {
                options: {
                    basePath: "<%= compass.main.options.basePath %>",
                    config: "<%= compass.main.options.config %>",
                    clean: true
                }
            }
        },

        styleguide: {
            options: {
                framework: {
                    name: "styledocco"
                }
            },
            common: {
                options: {
                    template: {
                        include: [
                            "../htdocs/common/css/common.css"
                        ]
                    }
                },
                files: {
                    "doc/css/common": "css/common/css/*"
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

        karma: {
            common: {
                configFile: "test/karma.conf.js",
                singleRun: true,
                browsers: [ "PhantomJS" ]
            },
            common_browsers: {
                configFile: "test/karma.conf.js",
                singleRun: true,
                browsers: [ "PhantomJS", "Chrome", "Firefox", "Safari", "IE" ]
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
                    configure: "js/jsdoc.conf.json",
                    destination: "doc/js"
                }
            }
        },


        meta_excel: {
            options: {
                dataStartingRow: 7,
                mapping: {
                    filename: "D",
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

        update_nav_excel: {
            options: {
                dataStartingRow: 7,
                mapping: {
                    filename: "D",
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
                localNavHTML: "../htdocs/Templates/contents_page.dwt",
                localNavElm: "nav#localNav"
            }
        },

        cat: {
            coverage: { src: "test/tmp/__coverage/*/coverage.txt" }
        },
        

        clean: {
            test: [ "test/tmp" ],
            cssdoc: [
                "doc/css/**/*.html",
                "doc/css/**/*.css"
            ],

            generated: [
                "../htdocs/**/*.*",
                "!../htdocs/**/*.dwt",
                "!../htdocs/__modules/**/*.*",

                "doc/js",
                "doc/css/**/*.*",
                "css/common/css/design_schemes/_icon.scss"
            ]
        },

        copy: {
            ionicons: {
                files: [
                    {
                        expand: true,
                        dest: "font-svg/icon/",
                        cwd: "bower_components/ionicons/src/",
                        src: [
                            "ios7-arrow-back.svg",
                            "ios7-arrow-forward.svg",
                            "ios7-arrow-up.svg",
                            "ios7-arrow-down.svg",
                            "ios7-arrow-left.svg",
                            "ios7-arrow-right.svg",
                            "ios7-arrow-thin-up.svg",
                            "ios7-arrow-thin-down.svg",
                            "ios7-arrow-thin-left.svg",
                            "ios7-arrow-thin-right.svg",
                            "ios7-browsers.svg",
                            "ios7-browsers-outline.svg"
                        ]
                    }
                ]
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
            },

            path_in_browserified_for_karma: {
                src: [ "test/tmp/**/karma*browserified*.js" ],
                overwrite: true,
                replacements: [
                    { from: / src="\//g, to: " src=\"/base/" }
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
            }
        },

        prompt: {
            task_menu: {
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
                            choices: _.flatten( [
                                hasModele( "grunt-meta-excel" )?
                                    [
                                        { name: "HTMLの<title>，メタ情報の更新", value: "meta_excel" },
                                        { name: "HTMLの生成", value: "meta_excel::generate" },
                                        "---"
                                    ]: [],
                                { name: "JavaScriptのテスト", value: "test" },
                                { name: "JSDocの生成", value: "jsdoc" },
                                "---",
                                { name: "戻る", value: "task_menu" },
                                { name: "メニューの終了", value: "" }
                            ] ),
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
    
    // ToDo: なぜかmatchdepで捕捉されない。
    grunt.loadNpmTasks( "grunt-attention" );
    if( hasModele( "grunt-meta-excel" ) ){
        grunt.loadNpmTasks( "grunt-meta-excel" ); 
    }

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

    grunt.registerTask( "css", [
        "webfont",
        "compass:main_clean",
        "compass:main"
    ] );

    grunt.registerTask( "cssdoc", [
        "clean:cssdoc",
        "webfont",
        "compass:main_clean",
        "compass:main_for_cssdoc",
        "styleguide:common",
        "compass:main_clean",
        "compass:main"
    ] );

    grunt.registerTask( "js", [ "uglify", "replace:license_comment_format" ] );

    grunt.registerTask( "setup", [
        "exec:bower_install",
        "copy:ionicons"
    ] );

    grunt.registerTask( "test", function(){
        grunt.task.run( [
            "clean:test",
            "browserify:common",
            "replace:path_in_browserified_for_karma"
        ] );

        grunt.task.run(
            this.flags.browsers ?
                [ "karma:common_browsers" ]:
                [ "karma:common", "cat:coverage" ]
        );
    } );

    grunt.registerTask( "before_testem", [
        "clean:test",
        "browserify:common",
    ] );

    grunt.registerTask( "task_menu", [ "prompt:task_menu", "respond_to_task_select" ] );

    grunt.registerTask( "default", [ "task_menu" ] );
};
