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
        require( "./grunt/config/setup.js" ),
        require( "./grunt/config/integration.js" ),
        require( "./grunt/config/html.js" ),
        require( "./grunt/config/css.js" ),
        require( "./grunt/config/javascript.js" ),
        require( "./grunt/config/task_menu.js" )
    );

    grunt.initConfig( gruntConfigs );


    // load all grunt tasks
    require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );
    
    if( hasModule( "grunt-meta-excel" ) ){
        grunt.loadNpmTasks( "grunt-meta-excel" ); 
    }

    grunt.loadTasks( "grunt" );


    grunt.registerTask( "default", [ "task_menu" ] );
};
