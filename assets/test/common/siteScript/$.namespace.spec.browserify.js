"use strict";

var expect = chai.expect,
    fixtures = require( "js-fixtures" ),

    ERRORS_STOCK_SCRIPT_TAG = [
        '<script>',
            'window.errorsStock = [];',
            'function globalErrorHandler( e ){ window.errorsStock.push( e ); return true; };',
            'window.onerror = globalErrorHandler;',
        '</script>'
    ].join( "" );

describe( "siteScript", function(){

    describe( "$.namespace", function(){
        it( "名前空間を定義する。", function(){
            expect( $.namespace.getRoot().test1 ).to.not.exist;
            $.namespace( "siteScript.test1.test2.test3" );
            expect( $.namespace.getRoot().test1.test2.test3 ).to.exist;
        } );

        describe( "ファイルの読み込み順に関して", function(){
            if( typeof window === "undefined" ){
                it( "ブラウザでないとテストできません。" );
            } else {

                afterEach( function(){
                    fixtures.cleanUp();
                } );

                it( "$.namespaceが読み込まれた時に、window.$が存在する場合は、そのメンバーとしてnamespaceメソッドを定義する。", function( done ){
                    fixtures.set( [
                        ERRORS_STOCK_SCRIPT_TAG,
                        '<script src="/bower_components/jquery/dist/jquery.js"></script>',
                        '<script src="/js/common/siteScript/$.namespace.js"></script>'
                    ].join( "" ) );

                    fixtures.window().onload = function(){
                        expect( fixtures.window().jQuery.namespace ).to.be.a( "function" );
                        done();
                    };
                } );

                it( "$.namespaceが読み込まれた時に、window.$が存在しない場合は、まずグローバルスコープに$を定義して、そのメンバーとしてnamespaceメソッドを定義する。", function( done ){
                    fixtures.set( [
                        ERRORS_STOCK_SCRIPT_TAG,
                        '<script src="/js/common/siteScript/$.namespace.js"></script>'
                    ].join( "" ) );

                    fixtures.window().onload = function(){
                        expect( fixtures.window().$.namespace ).to.be.a( "function" );
                        done();
                    };
                } );

                it( "$.namespaceが読み込まれた時に、すでに同名のプロパティが存在する場合は、エラーを投げる。", function( done ){
                    fixtures.set( [
                        ERRORS_STOCK_SCRIPT_TAG,
                        '<script>var $ = { namespace: function(){} };</script>',
                        '<script src="/js/common/siteScript/$.namespace.js"></script>'
                    ].join( "" ) );

                    fixtures.window().onload = function(){
                        expect( fixtures.window().errorsStock[ 0 ] ).to
                            .contain( "$.namespaceの定義に失敗しました。scriptファイルの構成が想定外です。" );
                        done();
                    };
                } );

                it( "$.namespaceが複数回定義された場合、エラーを投げる。", function( done ){
                    fixtures.set( [
                        ERRORS_STOCK_SCRIPT_TAG,
                        '<script src="/js/common/siteScript/$.namespace.js"></script>',
                        '<script src="/js/common/siteScript/$.namespace.js"></script>'
                    ].join( "" ) );

                    fixtures.window().onload = function(){
                        expect( fixtures.window().errorsStock[ 0 ] ).to
                            .contain( "$.namespaceの定義に失敗しました。scriptファイルの構成が想定外です。" );
                        done();
                    };
                } );
            }
        } );
    } );
} );
