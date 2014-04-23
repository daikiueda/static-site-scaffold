"use strict";

var chai = chai || require( "chai" ),
    expect = chai.expect,
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
        describe( "ファイルの読み込み順に関して", function(){
            if( typeof window === "undefined" ){
                it( "ブラウザでないとテストできません。" );
            } else {

                afterEach( function(){
                    fixtures.cleanUp();
                    fixtures.clearCache();
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
            }
        } );
    } );
} );
