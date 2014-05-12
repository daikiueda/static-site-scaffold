"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "HTML", function(){

    before( clean );
    after( clean );


    describe( "grunt meta_excel::generate", function(){
        it( "HTMLファイルを生成する。メタ情報にExcelの内容が適用されている。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/index.html" ) ).to.be.false;

            exec( "grunt meta_excel::generate", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/index.html" ) ).to.be.true;

                expect( fs.readFileSync( "../htdocs/index.html", "utf-8" ) )
                    .to.contain( '<title>サンプルサイト （+PR＆SEO向けメッセージ）</title>' );

                done();
            } );
        } );
    } );


    describe( "grunt update_nav_excel", function(){
        it( "HTMLファイル中のナビゲーション部分のコードが、Excelの内容にあわせて更新される。", function( done ){

            exec( "grunt update_nav_excel", function( error ){
                if( error ) return done( error );

                var resultHTMLSample =
                    fs.readFileSync( "../htdocs/sample_dir_1/sample_subdir/sample_2.html", "utf-8" );

                expect( resultHTMLSample ).to.contain( '<li class="current"><a href="sample_2.html">サンプルページ2</a></li>' );
                expect( resultHTMLSample ).to.contain( '<li><a href="../../index.html">HOME</a></li>' );

                done();
            } );
        } );
    } );


    describe( "grunt htmllint", function(){
        it( "HTMLファイルの構文チェックを実行する。", function( done ){

            exec( "grunt htmllint", function( error, stdout ){
                if( error ) return done( error );

                expect( stdout ).to.contain( '6 files lint free.' );

                done();
            } );
        } );
    } );
} );
