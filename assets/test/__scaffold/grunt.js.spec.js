"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "JavaScript", function(){

    before( clean );
    after( clean );

    describe( "grunt uglify", function(){
        it( "jsファイルを結合・圧縮して出力する。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/common/js/libs.js" ) ).to.be.false;
            expect( fs.existsSync( "../htdocs/common/js/common.js" ) ).to.be.false;

            exec( "grunt uglify", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/common/js/libs.js" ) ).to.be.true;
                expect( fs.existsSync( "../htdocs/common/js/common.js" ) ).to.be.true;

                done();
            } );
        } );
    } );


    describe( "grunt js", function(){

        before( clean );

        it( "jsファイルを結合・圧縮して出力する。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/common/js/libs.js" ) ).to.be.false;
            expect( fs.existsSync( "../htdocs/common/js/common.js" ) ).to.be.false;

            exec( "grunt uglify", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/common/js/libs.js" ) ).to.be.true;
                expect( fs.existsSync( "../htdocs/common/js/common.js" ) ).to.be.true;

                done();
            } );
        } );

        it( "圧縮後のjsファイル中に、ライブラリのライセンス表記が残っている。" )
    } );


    describe( "grunt browserify", function(){
        it( "テスト用にbrowserifyされたjsファイルが出力される。" );
    } );


    describe( "grunt test", function(){
        it( "テストが実行される。" );
        it( "テスト・カバレッジのレポートが出力される。" );
    } );


    describe( "grunt before_testem", function(){
        it( "testem用のjsファイルが出力される。" );
    } );
} );
