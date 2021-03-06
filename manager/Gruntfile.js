/*
 * static-site-scaffold
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

var _ = require( "lodash" );

function hasModule( moduleName ){
    var module;
    try { module = require.resolve( moduleName ); } catch( e ){}
    return ( module )? true: false;
}

module.exports = function( grunt ){

    var gruntConfigs = _.merge(
        {
            pkg: grunt.file.readJSON( "package.json" ),

            env: {
                htdocs: "../htdocs",

                assets: "../assets",

                sitemapExcel: {
                    path: "../assets/doc/sitemap.xlsm",
                    dataStartingRow: 7,
                    mapping: {
                        filename: "D",
                        path: "E",
                        title: "F",
                        title_all: "G",
                        description: "I",
                        keywords: "K",
                        url: "M",
                        thumbnail: "N",
                        template: "O"
                    }
                },

                alternativeLocalServerName: null,

                debug: false
            }
        },
        require( "./grunt/setup.js" ),
        require( "./grunt/integration.js" ),
        require( "./grunt/html.js" ),
        require( "./grunt/css.js" ),
        require( "./grunt/js.js" ),
        require( "./grunt/task_menu.js" )
    );

    if( grunt.file.exists( "./__settings__.js" ) ){

        var userSetting = require( "./__settings__.js" );

        switch( typeof userSetting ){
            case "object":
                gruntConfigs = _.merge( gruntConfigs, userSetting );
                break;

            case "function":
                gruntConfigs = userSetting( gruntConfigs );
                break;
        }
    }

    grunt.initConfig( gruntConfigs );

    // load all grunt tasks
    require( "load-grunt-tasks" )( grunt );
    if( hasModule( "grunt-meta-excel" ) ){
        grunt.loadNpmTasks( "grunt-meta-excel" );
    }
    grunt.loadTasks( "grunt/tasks" );

    grunt.registerTask( "default", [ "task_menu" ] );


    // Windows 7 + Ruby 2.0.x の環境において、Sassのコンパイル時に文字コードのエラーが発生するので、
    // 環境変数を追加することで手当てする。
    // http://docs.ruby-lang.org/ja/2.0.0/doc/spec=2frubycmd.html#cmd_option
    if( require( "os" ).platform() === "win32" && !process.env.RUBYOPT ){
        process.env.RUBYOPT = "-EUTF-8";
    }
};
