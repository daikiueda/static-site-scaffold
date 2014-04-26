/**
 * Update localNav in .dwt
 */

"use strict";

var LOCAL_NAV_DWT_PATH = "../htdocs/Templates/contents_page.dwt",

    UNLIKE_STRINGS = {
        "©": "&copy;"
    };

module.exports = function( grunt ){
    grunt.registerTask( "update_dwt_local_nav", function(){

        var fs = require( "fs" ),
            _ = require( "lodash" ),
            jsdom = require( "jsdom" ),

            content = fs.readFileSync( LOCAL_NAV_DWT_PATH, "utf-8" ),
            document = jsdom.jsdom( content ),
            window = document.createWindow(),

            done = this.async();

        jsdom.jQueryify(
            window,
            function( window, $ ){

                $( "script.jsdom" ).remove();

                var htmlCode = $( "html" ).html();
                _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
                    htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
                } );

                fs.writeFileSync(
                    LOCAL_NAV_DWT_PATH,
                    content.replace(
                        /([\S\s]*<html[^>]*>)[\S\s]*(<\/html>[\S\s]*)/,
                        "$1" + htmlCode + "$2"
                    ),
                    "utf-8"
                );
                done();
            }
        );
    } );
};