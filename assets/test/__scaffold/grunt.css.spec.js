"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "CSS", function(){

    before( clean );
    after( clean );

    describe( "grunt webfont", function(){
        it( "webフォント（アイコン）を出力する。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/common/fonts/icon" ) ).to.be.false;

            exec( "grunt webfont", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/common/fonts/icon/icon.eot" ) ).to.be.true;
                expect( fs.existsSync( "../htdocs/common/fonts/icon/icon.svg" ) ).to.be.true;
                expect( fs.existsSync( "../htdocs/common/fonts/icon/icon.ttf" ) ).to.be.true;
                expect( fs.existsSync( "../htdocs/common/fonts/icon/icon.woff" ) ).to.be.true;

                done();
            } );
        } );
    } );

    describe( "grunt compass:main", function(){
        it( ".scssファイルをコンパイルして、cssファイルを出力する。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/common/css/common.css" ) ).to.be.false;

            exec( "grunt compass:main", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/common/css/common.css" ) ).to.be.true;

                done();
            } );
        } );
    } );
} );
