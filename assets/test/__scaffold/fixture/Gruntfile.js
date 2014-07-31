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
            pkg: grunt.file.readJSON( "../../../package.json" ),
            env: {
                sitemapExcel: {
                    path: "../../../doc/sitemap.xlsm",
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
        require( "../../../grunt/setup.js" ),
        require( "../../../grunt/integration.js" ),
        require( "../../../grunt/html.js" ),
        require( "../../../grunt/css.js" ),
        require( "../../../grunt/js.js" ),
        require( "../../../grunt/task_menu.js" )
    );

    grunt.initConfig( gruntConfigs );


    // load all grunt tasks
    require( "matchdep" ).filterAll( "grunt-*" ).forEach( grunt.loadNpmTasks );
    
    if( hasModule( "grunt-meta-excel" ) ){
        grunt.loadNpmTasks( "grunt-meta-excel" ); 
    }

    grunt.loadTasks( "../../../grunt/tasks" );


    grunt.registerTask( "default", function(){
        console.log( "hoge" );
    } );
};
