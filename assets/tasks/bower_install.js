/**
 *
 */


"use strict";


var path = require( "path" ),
    _ = require( "lodash" );


module.exports = function( grunt ){

    grunt.registerTask( "bower", "Execute 'bower install'.", function(){
        var bower,
            done;

        try {
            bower = require( path.resolve( require.resolve( "bower" ), "../../lib" ) );
        } catch( e ){
            grunt.log.errorlns( "bowerの起動に失敗しました。以下の可能性が考えられます。" );

            if( !process.env[ "NODE_PATH" ] ){
                grunt.log.writeln( " * 環境変数「NODE_PATH」が設定されていない。" );
            }
            else {
                grunt.log.writeln( " * 環境変数「NODE_PATH」の設定が不正である。（" + process.env[ "NODE_PATH" ]  + "）" );
            }
            grunt.log.writeln( " * 「bower」がインストールされていない。" );

            grunt.fail.fatal( "上記を確認のうえ、「grunt bower」を実行してください。" );
        }

        done = this.async();

        var installation = bower.commands.install();

        installation.on( "log", function( log ){
            grunt.log.writeln( _.template( " * <%= id %> -> <%= message %>" )( log ) );
        } );
        installation.on( "end", function( results ){
            if( !_.isEmpty( results ) ){
                grunt.log.ok( "Installed", _.keys( results ) );
            }
            else {
                grunt.log.ok( "All components have been installed." );
            }
            done();
        } );
    } );
};