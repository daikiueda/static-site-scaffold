module.exports = {
    exec: {
        bower_install: {
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
        }
    },
    
    copy: {
        ionicons: {
            files: [
                {
                    expand: true,
                    dest: "font-svg/icon/",
                    cwd: "bower_components/ionicons/src/",
                    src: [
                        "ios7-arrow-back.svg",
                        "ios7-arrow-forward.svg",
                        "ios7-arrow-up.svg",
                        "ios7-arrow-down.svg",
                        "ios7-arrow-left.svg",
                        "ios7-arrow-right.svg",
                        "ios7-arrow-thin-up.svg",
                        "ios7-arrow-thin-down.svg",
                        "ios7-arrow-thin-left.svg",
                        "ios7-arrow-thin-right.svg",
                        "ios7-browsers.svg",
                        "ios7-browsers-outline.svg"
                    ]
                }
            ]
        }
    }
};