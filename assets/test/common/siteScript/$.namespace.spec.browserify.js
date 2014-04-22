"use strict";

var chai = chai || require( "chai" ),
    expect = chai.expect,
    fixtures = require( "js-fixtures" )

describe( "siteScript", function(){

    describe( "$namespace", function(){
        describe( "ファイルの読み込み順", function(){
            if( typeof window === "undefined" ){
                it( "ブラウザでないとテストできません。" );
            } else {

                afterEach( function(){
                    fixtures.cleanUp();
                } );

                it( "aaaaaa", function(){
                    fixtures.set( "<p>aaaa</p>" );
                    expect( 1 ).to.equal( 1 );
                } );

                it( "bbbb", function(){
                    fixtures.set( "<p>bbbb</p>" );
                    expect( 1 ).to.equal( 1 );
                } );
            }
        } );
    } );
} );
