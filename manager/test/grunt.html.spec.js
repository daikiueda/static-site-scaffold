"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    path = require( "path" ),

    expect = require( "chai" ).expect,
    shell = require( "shelljs" );

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "HTML", function(){

    before( clean );
    after( clean );


    try {
        require.resolve( "grunt-meta-excel" );
    } catch( e ){
        it( "grunt-meta-excelが未導入です。" );
    }


    describe( "grunt meta_excel::generate", function(){

        it( "HTMLファイルを生成する。メタ情報にExcelの内容が適用されている。", function( done ){

            // 実行前
            expect( fs.existsSync( "../htdocs/index.html" ) ).to.be.false;

            exec( "grunt meta_excel::generate", function( error ){
                if( error ) return done( error );

                expect( fs.existsSync( "../htdocs/index.html" ) ).to.be.true;

                var fileContent = fs.readFileSync( "../htdocs/index.html", "utf-8" );

                expect( fileContent ).to.contain( '<title>サンプルサイト （+PR＆SEO向けメッセージ）</title>' );
                expect( fileContent ).to.contain( '<!-- InstanceBegin template="/Templates/base.html" ' );

                done();
            } );
        } );
    } );

    describe( "grunt htmlcommenttemplate", function(){
        it( "HTMLファイル中の共通部分が、テンプレートにあわせて更新される。", function( done ){

            exec( "grunt htmlcommenttemplate", function( error ){
                if( error ) return done( error );

                var resultHTMLSample =
                    fs.readFileSync( "../htdocs/sample_dir_1/sample_subdir/sample_2.html", "utf-8" );

                expect( resultHTMLSample ).to.contain( '<link rel="stylesheet" href="../../common/css/common.css">' );

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

        describe( "utf8以外の文字コードが指定された場合", function(){

            var TEST_TEMP_PATH = "./test/.tmp/",
                FIXTURE_DIR_NAME = "htdocs_sjis",
                FIXTURE_SRC_PATH = path.join( "./test/fixture", FIXTURE_DIR_NAME ),
                FIXTURE_COPY_PATH = path.join( TEST_TEMP_PATH, FIXTURE_DIR_NAME );

            before( function(){
                shell.rm( "-rf", FIXTURE_COPY_PATH );
                shell.cp( "-r", FIXTURE_SRC_PATH, TEST_TEMP_PATH );
            } );

            after( function(){
                shell.rm( "-rf", FIXTURE_COPY_PATH );
            } );

            it( "HTMLファイル中のナビゲーション部分のコードが、Excelの内容にあわせて更新される。", function( done ){

                exec( "grunt --gruntfile ./test/fixture/Gruntfile.js update_nav_excel", function( error ){
                    if( error ) return done( error );

                    var resultHTMLSample = require( "iconv-lite" ).decode(
                        fs.readFileSync( path.join( FIXTURE_COPY_PATH, "sample_dir_1/sample_subdir/sample_2.html" ) ),
                        "shift_jis"
                    );

                    expect( resultHTMLSample ).to.contain( '<li class="current"><a href="sample_2.html">サンプルページ2</a></li>' );
                    expect( resultHTMLSample ).to.contain( '<li><a href="../../index.html">HOME</a></li>' );

                    done();
                } );
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
