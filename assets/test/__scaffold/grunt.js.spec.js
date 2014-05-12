"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect,
    exists = fs.existsSync;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "JavaScript", function(){

    before( clean );
    after( clean );

    describe( "ビルド", function(){

        describe( "grunt uglify", function(){
            it( "jsファイルを結合・圧縮して出力する。", function( done ){

                // 実行前
                expect( exists( "../htdocs/common/js/libs.js" ) ).to.be.false;
                expect( exists( "../htdocs/common/js/common.js" ) ).to.be.false;

                exec( "grunt uglify", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../htdocs/common/js/libs.js" ) ).to.be.true;
                    expect( exists( "../htdocs/common/js/common.js" ) ).to.be.true;

                    done();
                } );
            } );
        } );


        describe( "grunt js", function(){

            before( clean );

            it( "jsファイルを結合・圧縮して出力する。", function( done ){

                // 実行前
                expect( exists( "../htdocs/common/js/libs.js" ) ).to.be.false;
                expect( exists( "../htdocs/common/js/common.js" ) ).to.be.false;

                exec( "grunt uglify", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../htdocs/common/js/libs.js" ) ).to.be.true;
                    expect( exists( "../htdocs/common/js/common.js" ) ).to.be.true;

                    done();
                } );
            } );

            it( "圧縮後のjsファイル中に、ライブラリのライセンス表記が残っている。", function( done ){
                var sampleJsCode = fs.readFileSync( "../htdocs/common/js/libs.js", "utf-8" );

                expect( sampleJsCode ).to.contain( "jQuery JavaScript Library" );
                expect( sampleJsCode ).to.contain( "Sizzle CSS Selector Engine" );

                done();
            } )
        } );
    } );


    describe( "テスト", function(){

        describe( "grunt browserify", function(){

            before( clean );

            it( "テスト用にbrowserifyされたjsファイルが出力される。", function( done ){

                // 実行前
                expect( exists( "test/tmp/common/siteScript/karma.common.browserified.js" ) ).to.be.false;

                exec( "grunt browserify", function( error ){
                    if( error ) return done( error );

                    expect( exists( "test/tmp/common/siteScript/karma.common.browserified.js" ) ).to.be.true;

                    done();
                } );
            } );
        } );


        describe( "grunt test", function(){

            before( clean );

            it( "テストが実行される。", function( done ){

                // 実行前
                expect( exists( "test/tmp/__coverage" ) ).to.be.false;

                exec( "grunt test", function( error, stdout, stderr ){
                    if( error ) return done( error );

                    expect( stdout ).to.include( "Starting browser PhantomJS" );
                    expect( stdout ).to.include( "tests completed" );
                    expect( stdout ).to.include( "Done, without errors." );

                    done();
                } );
            } );

            it( "テスト・カバレッジのレポートが出力される。", function( done ){

                expect( exists( "test/tmp/__coverage" ) ).to.be.true;
                
                done();
            } );
        } );


        describe( "grunt before_testem", function(){

            before( clean );

            it( "testem用のjsファイルが出力される。", function( done ){

                // 実行前
                expect( exists( "test/tmp/common/siteScript/testem.common.browserified.js" ) ).to.be.false;

                exec( "grunt browserify", function( error ){
                    if( error ) return done( error );

                    expect( exists( "test/tmp/common/siteScript/testem.common.browserified.js" ) ).to.be.true;

                    done();
                } );
            } );
        } );
    } );
} );
