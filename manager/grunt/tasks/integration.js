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

    // generate_all
    grunt.registerTask( "generate_all", "Build all resources. Then generate HTML files.", [
        "build",
        "meta_excel::generate",
        "htmlcommenttemplate",
        "update_nav_excel"
    ] );

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
    grunt.registerTask( "screen_shot", "Save screen dump to file(s).", function(){

        if( !grunt.config( "env.alternativeLocalServerName" ) ){
            grunt.task.run( "connect:htdocs" );
        }

        grunt.task.run( "dump_pages:main" );
    } );

    // dump_pages
    grunt.registerMultiTask( "dump_pages", "[NOT FOR CLI] Save screen dump to file(s) with local server. ", function(){

        var dumpScreen = require( "./lib/dumpScreen.js" ),

            options = this.options( {
                dest: "__screen_shot",
                widths: [ 1024 ],
                imageType: "png"
            } ),

            destDir = path.join(
                options.dest,
                moment().format( "YYYYMMDD-HHmm-ssSS" )
            ),

            widths = options.widths,

            errors = [],

            done = this.async();

        this.files.reduce( function( previousProcess, file ){

            return previousProcess.then( function(){
                return dumpScreen( file.dest, widths, destDir, options )
                    .then(
                        function(){
                            grunt.log.ok( [
                                file.dest + "." + options.imageType + " ... ",
                                chalk.green( "saved." )
                            ].join( "" ) );
                        },
                        function( message ){
                            errors.push( message );
                            grunt.log.warn( file.dest + " ... " + message );
                        }
                    );
            } );
        }, Q() )
            .then(
                function(){
                    grunt.log.writeln( "" );

                    if( errors.length === 0 ){
                        grunt.log.ok( "Save .png files to " + chalk.underline.cyan( destDir ) );
                        done();
                    }
                    else {
                        grunt.log.warn( "Oops! Something went wrong. Please check your local server setting." );
                        done( false );
                    }
                },
                function(){ done( false ); }
            );
    } );
};
