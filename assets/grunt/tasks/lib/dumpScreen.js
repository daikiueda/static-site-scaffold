/*
 * dumpScreen
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var path = require( "path" ),
    _ = require( "lodash" ),
    Q = require( "q" ),
    webshot = require( "webshot" );

function dumpScreen( filePath, widths, destDir, options ){
    var url = [
            "http:/",
            options.hostname.replace( /\/$/, "" ),
            filePath.replace( /^\//, "" )
        ].join( "/" ),

        imageType = options.imageType || "png",

        webshotOptions = _.assign( options.webshot || {}, {
            windowSize: {
                height: 768
            },
            shotSize: {
                width: "window",
                height: "all"
            }
        } );

    return widths.reduce( function( previousProcess, currentWidth ){

        return previousProcess.then( function(){
            var deferredOneWidth = Q.defer(),

                dest = path.join(
                    destDir,
                    "w" + currentWidth,
                    filePath + "." + imageType
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
