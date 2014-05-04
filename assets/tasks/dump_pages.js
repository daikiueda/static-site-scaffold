/**
 * Dump screen
 */

"use strict";

var path = require( "path" ),
    webshot = require( "webshot" ),
    Q = require( "q" );


function dumpScreen( filePath, options ){
    var deferred = Q.defer(),

        url = [
            options.urlRoot.replace( /\/$/, "" ),
            filePath.replace( /^\//, "" )
        ].join( "/" ),

        dest = path.resolve(
            options.dest,
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
            done = this.async();

        Q.all( this.files.map( function( file ){
            return dumpScreen( file.dest, options )
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