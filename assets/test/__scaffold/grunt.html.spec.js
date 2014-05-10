"use strict";

var exec = require( "child_process" ).exec,
    expect = require( "chai" ).expect;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "HTML", function(){

    before( clean );
    afterEach( clean );

    describe( "grunt meta_excel::generate", function(){
        it( "HTMLファイルを生成する。", function( done ){
            exec( "grunt meta_excel::generate", function( error ){
                if( error ) return done( error );

                done();
            } );
        } );
    } );
} );
