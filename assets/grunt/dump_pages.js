/**
 * Dump pages.
 */

"use strict";

var path = require( "path" ),
    Q = require( "q" ),
    webshot = require( "webshot" ),
    moment = require( "moment" ),
    chalk = require( "chalk" );


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

module.exports = function( grunt ){
    grunt.registerMultiTask( "dump_pages", "Save screen dump to file(s).", function(){

        var options = this.options( {
                dest: "__screen_shot",
                widths: [ 1024 ]
            } ),

            destDir = path.join(
                options.dest,
                moment().format( "YYYYMMDD-hhmm-ssSS" )
            ),

            widths = options.widths,

            done = this.async();

        Q.all( this.files.map( function( file ){
            return dumpScreen( file.dest, widths, destDir, options )
                .then(
                    function(){ grunt.log.ok( [
                        file.dest + ".png ... ",
                        chalk.green( "saved." )
                    ].join( "" ) ); },
                    function( message ){ grunt.log.warn( message ); }
                );
        } ) )
            .then(
                function(){
                    grunt.log.writeln( "" );
                    grunt.log.ok( "Save .png files to " + chalk.underline.cyan( destDir ) );
                    done();
                },
                function(){ done( false ); }
            );
    } );
};