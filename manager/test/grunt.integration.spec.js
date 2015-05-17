"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect,
    exists = fs.existsSync,

    _ = require( "lodash" );

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "Integration", function(){

    before( clean );
    after( clean );


    describe( "grunt build", function(){

        before( clean );

        it( "css, jsファイルの生成が実行される。", function( done ){

            // 実行前
            expect( exists( "../htdocs/common/js/common.js" ) ).to.be.false;
            expect( exists( "../htdocs/common/css/common.css" ) ).to.be.false;

            exec( "grunt build", function( error ){
                if( error ) return done( error );

                expect( exists( "../htdocs/common/js/common.js" ) ).to.be.true;
                expect( exists( "../htdocs/common/css/common.css" ) ).to.be.true;

                done();
            } );
        } );
    } );


    describe( "grunt screen_shot", function(){

        before( function( done ){
            exec( "grunt clean:generated generate_all -f", function( error ){
                if( error ) return done( error );
                done();
            } );
        } );

        it( "スクリーンショットを一括で出力する。", function( done ){

            // 実行前
            expect( exists( "__screen_shot" ) ).to.be.false;

            exec( "grunt screen_shot", function( error ){
                if( error ) return done( error );

                expect( exists( "__screen_shot" ) ).to.be.true;

                done();
            } );
        } );

        it( "指定した横幅ごとにディレクトリ分けして、画像ファイルを出力する。", function( done ){

            var subDirs = fs.readdirSync( "__screen_shot/" + fs.readdirSync( "__screen_shot" )[ 0 ] );

            expect( subDirs ).to.eql( [ 'w1024', 'w640' ] );

            done();
        } );

        it( "実行されるごとに新しいディレクトリを作って、画像ファイルが上書きされないようにする。", function( done ){

            exec( "grunt screen_shot", function( error ){
                if( error ) return done( error );

                expect( fs.readdirSync( "__screen_shot/" ) ).to.have.length( 2 );

                done();
            } );
        } );
    } );


    describe( "grunt clean:generated -f", function(){

        it( "タスクで生成されたファイルを、すべて削除する。", function( done ){

            exec( "grunt clean:generated -f", function( error ){
                if( error ) return done( error );

                var dirs_and_files = [
                    "../htdocs/common",

                    "css/common/css/design_schemes/_icon.scss",

                    "doc/js",
                    "doc/css",

                    "tmp",
                    "test/tmp",

                    "__screen_shot"
                ];

                expect( _( dirs_and_files ).map( exists ).value() )
                    .to.not.include( true );

                done();
            } );
        } );
    } );
} );
