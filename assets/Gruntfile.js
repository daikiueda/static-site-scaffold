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
                sitemapExcel: {
                    path: "doc/sitemap.xlsm",
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

                debug: false
            }
        },
        require( "./grunt/config/integration-tasks.js" ),
        require( "./grunt/config/html-tasks.js" ),
        require( "./grunt/config/css-tasks.js" ),
        require( "./grunt/config/javascript-tasks.js" ),
        require( "./grunt/config/task_menu.js" )
    );

    grunt.initConfig( gruntConfigs );


    // load all grunt tasks
    require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );
    
    if( hasModule( "grunt-meta-excel" ) ){
        grunt.loadNpmTasks( "grunt-meta-excel" ); 
    }

    grunt.loadTasks( "grunt" );


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
        "copy:ionicons",
        "make_menu_shortcut"
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
        "browserify:common"
    ] );

    grunt.registerTask( "screen_shot", [
        "build",
        "connect:livereload",
        "dump_pages:main"
    ] );

    grunt.registerTask( "task_menu", [ "prompt:task_menu", "respond_to_task_select" ] );

    grunt.registerTask( "default", [ "task_menu" ] );
};
