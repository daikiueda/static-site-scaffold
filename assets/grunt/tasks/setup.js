/**
 * grunt.registerTask
 *  - setup
 */

"use strict";

module.exports = function( grunt ){

    var os = require( "os" ),
        fs = require( "fs" ),
        path = require( "path" );


    // make_settings_js
    grunt.registerTask( "make_settings_js", "[NOT FOR CLI] Make __settings__.js for users own settings.", function(){

        var filePath = "./__settings__.js",
            
            defaultCode = [
                'module.exports = {',
                '    ',
                '}'
            ].join( "\n" );

        if( !grunt.file.exists( filePath ) ){
            grunt.file.write( filePath, defaultCode );
        }
    } );


    // make_menu_shortcut
    grunt.registerTask( "make_menu_shortcut", "[NOT FOR CLI] Make shortcut file to task menu.", function(){

        var isWin = os.type().match( /^Win/ ),
            extension = isWin ? "bat": "command",
            filePath = "../menu." + extension,

            commandsStr = [
                "cd assets",
                "grunt"
            ].join( os.EOL );

        if( !isWin ){
            commandsStr = [
                    "#!/bin/sh",
                    "cd `dirname $0`"
                ].join( os.EOL ) +
                os.EOL + commandsStr;
        }

        grunt.file.write(
            filePath,
            commandsStr
        );

        if( !isWin ){
            fs.chmodSync( filePath, "755" );
        }
    } );


    // setup
    grunt.registerTask( "setup", '[NOT FOR CLI] Setup workspace after "npm install". Including "bower install", make shortcut and etc..', function(){

        grunt.config( "exec.bower_install", {
            cmd: "bower install",
            stdout: false,
            stderr: false,
            callback: function( error, stdout, stderr ){
                if( stdout === "" && stderr === "" ){
                    grunt.log.ok( "All Components have been installed." );
                }

                if( error && error.code === 127 ){
                    grunt.log.error( "bowerがみつかりません。インストール状況を確認してください。" );
                    return;
                }

                stdout.split( /\n/ ).forEach( function( log ){
                    if( /\s{2,}/.test( log ) ) grunt.log.writeln( log.replace( /^.+\s{2,}/, " * " ) );
                    if( /^\S+\s\S+$/.test( log ) ) grunt.log.ok( log.replace( /\s\S+$/, "" ) );
                } );
                stderr.split( /\n/ ).forEach( function( err ){
                    if( /\s{2,}/.test( err ) ) grunt.log.error( err.replace( /\s{2,}/, "\n" ) );
                } );
            }
        } );

        grunt.task.run( [
            "exec:bower_install",
            "copy:ionicons",
            "make_settings_js",
            "make_menu_shortcut"
        ] );
    } );
};