/*
 * Update navigation with reference to excel.
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    Q = require( "q" ),

    JQUERY_PATH = "../../../bower_components/jquery/dist/jquery.min.js",

    UNLIKE_STRINGS = {
        "©": "&copy;",
        "™": "&trade;",
        "®": "&reg;"
    };


function updateHTML( htmlDir, metadata, templates, options ){
    var jsdom = require( "jsdom" ),
        deferred = Q.defer();

    try {
        var jquerySrcPath = [
                "file://",
                path.join( path.dirname( module.filename ), JQUERY_PATH )
                    .replace( /^\//, "" ).replace( /\\/g, "/" )
            ].join( "/" ),
            filePath = path.join( htmlDir, metadata.path ),
            content = fs.readFileSync( filePath, options.charset ),
            document = jsdom.jsdom( content ),
            window = document.createWindow();

        jsdom.jQueryify(
            window,
            jquerySrcPath,
            function( window, $ ){

                _.forEach( templates, function( template, selector ){
                    $( selector ).empty().append( template( metadata ) );
                } );

                $( "script.jsdom" ).remove();

                var htmlCode = $( "html" ).html();
                _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
                    htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
                } );

                fs.writeFileSync(
                    filePath,
                    content.replace(
                        /([\S\s]*<html[^>]*>)[\S\s]*(<\/html>[\S\s]*)/,
                        "$1" + htmlCode + "$2"
                    ),
                    options.charset
                );

                deferred.resolve( filePath + " ... updated." );
            }
        );
    } catch( e ){
        deferred.reject( e );
    }

    return deferred.promise;
}


module.exports = function( htmlDir, metadata, templates, options ){
    return updateHTML( htmlDir, metadata, templates, options );
};
