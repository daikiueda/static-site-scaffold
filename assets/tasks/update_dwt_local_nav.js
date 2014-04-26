/**
 * Update localNav in .dwt
 */

"use strict";

var XLSX2JSON_PATH = "../node_modules/grunt-meta-excel/node_modules/xlsx2json/lib/xlsx2json.js",

    UNLIKE_STRINGS = {
        "©": "&copy;",
        "™": "&trade;",
        "®": "&reg;"
    };

function updateLocalNav( dwtFilePath, metadata, options, callback ){
    var fs = require( "fs" ),
        _ = require( "lodash" ),
        jsdom = require( "jsdom" ),

        content = fs.readFileSync( dwtFilePath, options.charset ),
        document = jsdom.jsdom( content ),
        window = document.createWindow();

    jsdom.jQueryify(
        window,
        function( window, $ ){

            metadata.forEach( function( pageInfo ){
                console.log( pageInfo );
            } );

            $( "script.jsdom" ).remove();

            var htmlCode = $( "html" ).html();
            _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
                htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
            } );

            fs.writeFileSync(
                dwtFilePath,
                content.replace(
                    /([\S\s]*<html[^>]*>)[\S\s]*(<\/html>[\S\s]*)/,
                        "$1" + htmlCode + "$2"
                ),
                options.charset
            );

            callback( true );
        }
    );
}

module.exports = function( grunt ){
    grunt.registerMultiTask( "update_local_nav", "Update local navigation in .dwt file.", function(){

        var xlsx2json = require( XLSX2JSON_PATH ),

            options = this.options( {
                charset: "utf-8"
            } ),
            dwtFilePath = this.data.localNavDWT,

            done = this.async();

        xlsx2json( this.data.xlsx, options )
            .then(
                function( metadata ){
                    updateLocalNav( dwtFilePath, metadata, options, done );
                },
                function(){ done( false ); }
            );
    } );
};