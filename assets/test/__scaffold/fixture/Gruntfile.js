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
        {
            update_nav_excel: {
                options: {
                    dataStartingRow: "<%= env.sitemapExcel.dataStartingRow %>",
                    mapping: "<%= env.sitemapExcel.mapping %>"
                },
                main: {
                    xlsx: "<%= env.sitemapExcel.path %>",
                    htmlDir: "../.tmp/htdocs_sjis/",
                    templates: {
                        "#topic_path": "../../../grunt/templates/nav_topic_path.html",
                        "aside nav.local": "../../../grunt/templates/aside_nav_local.html"
                    },
                    options: {
                        charset: "shift_jis"
                    }
                }
            }
        }
    );

    grunt.initConfig( gruntConfigs );

    grunt.loadTasks( "../../../grunt/tasks" );
};
