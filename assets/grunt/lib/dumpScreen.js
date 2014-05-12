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

    return Q.all( widths.map( function( width, index ){
        var deferredOneWidth = Q.defer(),

            dest = path.join(
                destDir,
                    "w" + width,
                    filePath + ".png"
            );

        webshotOptions.windowSize.width = width;

        // 原因不明の出力漏れ（ひとつのサイズしか出力されない）が発生するので、
        // setTimeoutで実行タイミングをずらして手当てしている。
        setTimeout( function(){
            webshot( url, dest, webshotOptions, function( error ){
                if( error ){
                    deferredOneWidth.reject( error );
                    return;
                }

                deferredOneWidth.resolve( dest );
            } );
        }, 128 * index );

        return deferredOneWidth.promise;
    } ) );
}

module.exports = dumpScreen;
