/**
 * Dump screen
 */

"use strict";

var path = require( "path" ),
    Q = require( "q" ),
    webshot = require( "webshot" ),
    moment = require( "moment" );


function dumpScreen( filePath, destDir, options ){
    var deferred = Q.defer(),

        url = [
            options.urlRoot.replace( /\/$/, "" ),
            filePath.replace( /^\//, "" )
        ].join( "/" ),

        dest = path.join(
            destDir,
            filePath + ".png"
        ),

        webshotOptions = options.webshot || {};

    webshot( url, dest, webshotOptions, function( error ){
        if( error ){
            deferred.reject( error );
            return;
        }

        deferred.resolve( filePath );
    } );

    return deferred.promise;
}

module.exports = function( grunt ){
    grunt.registerMultiTask( "dump_pages", "Dump screen.", function(){

        var options = this.options( {
            } ),

            destDir = path.join(
                options.dest,
                moment().format( "YYYYMMDD-hhmm-ssSS" )
            ),

            done = this.async();

        Q.all( this.files.map( function( file ){
            return dumpScreen( file.dest, destDir, options )
                .then(
                    function( message ){ grunt.log.ok( message ) },
                    function( message ){ grunt.log.warn( message ) }
                );
        } ) )
            .then(
                function(){ done(); },
                function(){ done( false ); }
            );
    } );
};