"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "Integration", function(){

    before( clean );
    after( clean );


    describe( "grunt build", function(){

        before( clean );

        it( "css, jsファイルの生成が実行される。" );
    } );


    describe( "grunt screen_shot", function(){

        it( "スクリーンショットを一括で出力する。" );
    } );


    describe( "grunt clean:generated -f", function(){

        before( clean );
        
        it( "タスクで生成されたファイルを、すべて削除する。" );
    } );
} );
