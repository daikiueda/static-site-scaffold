/**
 * grunt.registerTask
 *  - build
 *  - server
 *  - screen_shot
 */

"use strict";

var path = require( "path" ),
    Q = require( "q" ),
    moment = require( "moment" ),
    chalk = require( "chalk" );


module.exports = function( grunt ){

    // build
    grunt.registerTask( "build", "Build all resources for website.", [ "css", "js" ] );

    // server
    grunt.registerTask( "server", "Start local server and file update watching.", function(){
        if( !this.flags.skip_build ){
            grunt.task.run( [ "build" ] );
        }
        grunt.task.run( [
            "browserSync:htdocs",
            "attention:server",
            "watch"
        ] );
    } );

    // screen_shot
    grunt.registerTask( "screen_shot", "Save screen dump to file(s).", [
        "build",
        "connect:htdocs",
        "dump_pages:main"
    ] );

    // dump_pages
    grunt.registerMultiTask( "dump_pages", "[NOT FOR CLI] Save screen dump to file(s) with local server. ", function(){

        var dumpScreen = require( "./lib/dumpScreen.js" ),

            options = this.options( {
                dest: "__screen_shot",
                widths: [ 1024 ]
            } ),

            destDir = path.join(
                options.dest,
                moment().format( "YYYYMMDD-HHmm-ssSS" )
            ),

            widths = options.widths,

            done = this.async();

        this.files.reduce( function( previousProcess, file ){

            return previousProcess.then( function(){
                return dumpScreen( file.dest, widths, destDir, options )
                    .then(
                        function(){
                            grunt.log.ok( [
                                file.dest + ".png ... ",
                                chalk.green( "saved." )
                            ].join( "" ) );
                        },
                        function( message ){ grunt.log.warn( message ); }
                    );
            } );
        }, Q() )
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


