/*
 * dumpScreen
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var path = require( "path" ),
    Q = require( "q" ),
    webshot = require( "webshot" );

function dumpScreen( filePath, widths, destDir, options ){
    var url = [
            options.urlRoot.replace( /\/$/, "" ),
            filePath.replace( /^\//, "" )
        ].join( "/" ),

        webshotOptions = options.webshot || {};

    if( !webshotOptions.windowSize ){
        webshotOptions.windowSize = { height: 768 };
    }

    return widths.reduce( function( previousProcess, currentWidth ){

        return previousProcess.then( function(){
            var deferredOneWidth = Q.defer(),

                dest = path.join(
                    destDir,
                    "w" + currentWidth,
                    filePath + ".png"
                );

            webshotOptions.windowSize.width = currentWidth;

            webshot( url, dest, webshotOptions, function( error ){
                if( error ){
                    deferredOneWidth.reject( error );
                    return;
                }

                deferredOneWidth.resolve( dest );
            } );

            return deferredOneWidth.promise;
        } );
    }, Q() );
}

module.exports = dumpScreen;
