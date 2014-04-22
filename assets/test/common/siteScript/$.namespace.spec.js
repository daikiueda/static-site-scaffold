"use strict";

var chai = chai || require( "chai" ),
    expect = chai.expect;

describe( "siteScript", function(){

    describe( "$namespace", function(){
        describe( "ファイルの読み込み順", function(){
            if( typeof window === "undefined" ){
                it( "ブラウザでないとテストできません。" );
            } else {
                it( "aaaa", function(){
                    expect( 1 ).to.equal( 1 );
                } );
            }
        } );
    } );
} );
