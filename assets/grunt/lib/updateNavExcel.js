/*
 * Update navigation with reference to excel.
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    Q = require( "q" ),

    TEMPLATE_PATHS = {
        "#topic_path": "grunt/templates/nav_topic_path.html",
        "aside nav.local": "grunt/templates/aside_nav_local.html"
    },
    TEMPLATES = {},

    UNLIKE_STRINGS = {
        "©": "&copy;",
        "™": "&trade;",
        "®": "&reg;"
    };


function prepareTemplates( options ){
    _.forEach( TEMPLATE_PATHS, function( templateFilePath, targetSelector ){
        TEMPLATES[ targetSelector ] =
            _.template( fs.readFileSync( templateFilePath, options.charset ) );
    } );
}


function updateHTML( htmlDir, metadata, options ){
    var jsdom = require( "jsdom" ),
        deferred = Q.defer();

    try {
        var filePath = path.join( htmlDir, metadata.path ),
            content = fs.readFileSync( filePath, options.charset ),
            document = jsdom.jsdom( content ),
            window = document.createWindow();

        jsdom.jQueryify(
            window,
            function( window, $ ){

                _.forEach( TEMPLATES, function( template, selector ){
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


module.exports = function( htmlDir, metadata, options ){
    prepareTemplates( options );
    return updateHTML( htmlDir, metadata, options );
};
