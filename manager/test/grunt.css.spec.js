"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect,
    exists = fs.existsSync;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "CSS", function(){

    before( clean );
    after( clean );

    describe( "ビルド", function(){

        afterEach( clean );

        describe( "grunt webfont", function(){
            it( "webフォント（アイコン）を生成する。", function( done ){

                // 実行前
                expect( exists( "../htdocs/common/fonts/icon" ) ).to.be.false;

                exec( "grunt webfont", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../htdocs/common/fonts/icon/icon.eot" ) ).to.be.true;
                    expect( exists( "../htdocs/common/fonts/icon/icon.svg" ) ).to.be.true;
                    expect( exists( "../htdocs/common/fonts/icon/icon.ttf" ) ).to.be.true;
                    expect( exists( "../htdocs/common/fonts/icon/icon.woff" ) ).to.be.true;

                    done();
                } );
            } );
        } );


        describe( "grunt compass:main", function(){
            it( ".scssファイルをコンパイルして、cssファイルを出力する。", function( done ){

                // 実行前
                expect( exists( "../htdocs/common/css/common.css" ) ).to.be.false;

                exec( "grunt webfont compass:main", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../htdocs/common/css/common.css" ) ).to.be.true;

                    done();
                } );
            } );
        } );


        describe( "grunt css", function(){

            it( "Webフォントの生成と、scssファイルのコンパイルを実行する。", function( done ){

                // 実行前
                expect( exists( "../htdocs/common/fonts/icon" ) ).to.be.false;
                expect( exists( "../htdocs/common/css/common.css" ) ).to.be.false;

                exec( "grunt css", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../htdocs/common/fonts/icon" ) ).to.be.true;
                    expect( exists( "../htdocs/common/css/common.css" ) ).to.be.true;

                    done();
                } );
            } );
        } );
    } );


    describe( "ドキュメント生成", function(){

        describe( "grunt cssdoc", function(){

            it( "スタイルガイドを出力する。", function( done ){

                // 実行前
                expect( exists( "../assets/doc/css" ) ).to.be.false;

                exec( "grunt cssdoc", function( error ){
                    if( error ) return done( error );

                    expect( exists( "../assets/doc/css" ) ).to.be.true;

                    done();
                } );
            } );

            it( "実行後、htdocsのファイルは配信用の状態に復元される。", function( done ){

                var sampleCssCode = fs.readFileSync( "../htdocs/common/css/common.css", "utf-8" );

                expect( sampleCssCode ).to.not.contain( "\n\n" );

                done();
            } );
        } );
    } );
} );
