/*
 * static-site-tools
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */

"use strict";

module.exports = function( grunt ){

    grunt.initConfig( {
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
            test_site: {
                xlsx: "metadata/sitemap.xlsm",
                htmlDir: "../htdocs/",
                options: {
                    boilerplate: "../htdocs/__boilerplate.html"
                }
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-meta-excel" );
//    grunt.loadNpmTasks( "grunt-contrib-jshint" );
//    grunt.loadNpmTasks( "grunt-mocha-test" );

    grunt.loadTasks( "tasks" );

//    grunt.registerTask( "test", [ "mochaTest" ] );
//    grunt.registerTask( "default", [ "jshint", "test" ] );
};
