/**
 * Make menu shortcut
 */


"use strict";


module.exports = function( grunt ){

    var os = require( "os" ),
        fs = require( "fs" ),
        path = require( "path" );

    grunt.registerTask( "make_menu_shortcut", "Make menu shortcut.", function(){

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
};