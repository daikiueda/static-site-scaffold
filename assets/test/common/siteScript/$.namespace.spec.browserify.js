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

        it( "名前空間の定義において、ルート階層も文字列が「siteScript」でない場合、エラーを投げる。", function(){
            expect( function(){ $.namespace( "" ); } ).to.throw( Error );
        } );

        describe( "ファイルの読み込み順に関して", function(){
            if( typeof window === "undefined" ){
                it( "ブラウザでないとテストできません。" );
            } else {

                afterEach( function(){
                    fixtures.cleanUp();
                } );

                it( "$.namespaceを読み込むscript要素がdata-namespace属性を持つ場合、" +
                    "その属性値を変数名として、グローバルスコープに名前空間の内容を展開する。",
                    function( done ){
                        fixtures.set( [
                            ERRORS_STOCK_SCRIPT_TAG,
                            '<script>var $ = {};</script>',
                            '<script src="/js/common/siteScript/$.namespace.js" data-namespace="testNS"></script>',
                            '<script>',
                                '$.namespace( "siteScript.test4.test5" );',
                                '$.namespace.getRoot().test4.test5.test6 = "TEST_STR";',
                            '</script>'
                        ].join( "" ) );

                        fixtures.window().onload = function(){
                            expect( fixtures.window().testNS.test4.test5.test6 )
                                .to.equal( "TEST_STR" );
                            done();
                        };
                    }
                );

                it( "$.namespaceが読み込まれた時に、window.$が存在する場合は、" +
                    "そのメンバーとしてnamespaceメソッドを定義する。",
                    function( done ){
                        fixtures.set( [
                            ERRORS_STOCK_SCRIPT_TAG,
                            '<script src="/bower_components/jquery/dist/jquery.js"></script>',
                            '<script src="/js/common/siteScript/$.namespace.js"></script>'
                        ].join( "" ) );

                        fixtures.window().onload = function(){
                            expect( fixtures.window().jQuery.namespace ).to.be.a( "function" );
                            done();
                        };
                    }
                );

                it( "$.namespaceが読み込まれた時に、window.$が存在しない場合は、" +
                    "まずグローバルスコープに$を定義して、そのメンバーとしてnamespaceメソッドを定義する。",
                    function( done ){
                        fixtures.set( [
                            ERRORS_STOCK_SCRIPT_TAG,
                            '<script src="/js/common/siteScript/$.namespace.js"></script>'
                        ].join( "" ) );

                        fixtures.window().onload = function(){
                            expect( fixtures.window().$.namespace ).to.be.a( "function" );
                            done();
                        };
                    }
                );

                it( "$.namespaceが読み込まれた時に、すでに同名のプロパティが存在する場合は、エラーを投げる。",
                    function( done ){
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
                    }
                );
            }
        } );
    } );
} );
