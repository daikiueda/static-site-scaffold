/*
 * Update navigation with reference to excel.
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    Q = require( "q" ),
    iconv = require( "iconv-lite" ),

    JQUERY_PATH = "../../../bower_components/jquery/dist/jquery.min.js",

    UNLIKE_STRINGS = {
        "©": "&copy;",
        "™": "&trade;",
        "®": "&reg;"
    };


function updateHTML( htmlDir, metadata, templates, options ){
    var deferred = Q.defer(),
        cheerio = require( "cheerio" ),
        
        filePath = path.join( htmlDir, metadata.path ),
        charset = options.charset || "utf8",
        content = iconv.decode( fs.readFileSync( filePath ), charset ),
        $ = cheerio.load( content, { decodeEntities: false } );
    
    _.forEach( templates, function( template, selector ){
        $( selector ).empty().append( template( metadata ) );
    } );

    var htmlCode = $.html();
    _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
        htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
    } );

    fs.writeFile( filePath, iconv.encode( new Buffer( htmlCode ), charset ), function( err ){
        if( err ){
            deferred.reject( err );
            return;
        }

        deferred.resolve( filePath + " ... updated." );
    } );

    return deferred.promise;
}


module.exports = function( htmlDir, metadata, templates, options ){
    return updateHTML( htmlDir, metadata, templates, options );
};
