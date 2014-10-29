"use strict";

var exec = require( "child_process" ).exec,
    fs = require( "fs" ),
    expect = require( "chai" ).expect,
    exists = fs.existsSync;

function clean( done ){
    exec( "grunt clean:generated -f", done );
}

describe( "Setup", function(){

    before( clean );
    after( clean );

    before( function save_current_settings(){
        if( fs.existsSync( "./__settings__.js" ) ){
            fs.renameSync( "./__settings__.js", "./__settings__.saveForTest.js" );
        }
    } );
    
    after( function restore_current_settings(){
        if( fs.existsSync( "./__settings__.saveForTest.js" ) ){
            fs.renameSync( "./__settings__.saveForTest.js", "./__settings__.js" );
        }
        else {
            fs.unlink( "./__settings__.js" );
        }
    } );


    describe( "grunt setup", function(){

        before( clean );

        describe( "make_settings_js", function(){
            it( "__settings__.jsを生成する。", function( done ){

                // 実行前
                expect( exists( "./__settings__.js" ) ).to.be.false;

                exec( "grunt make_settings_js", function( error ){
                    if( error ) return done( error );

                    expect( exists( "./__settings__.js" ) ).to.be.true;

                    done();
                } );
            } );
            
            describe( "__settings__.jsで設定した内容が、処理に反映される。", function(){
                
                it( "例）ファイル削除処理の追加。", function( done ){
                    fs.writeFile( "./__settings__.js", [
                        'module.exports = {',
                        '    clean: {',
                        '        test__settings__js: [ "./__settings__.js" ]',
                        '    }',
                        '}'
                    ].join( "\n" ), function(){
                        
                        exec( "grunt clean:test__settings__js", function( error ){
                            if( error ) return done( error );

                            expect( exists( "./__settings__.js" ) ).to.be.false;

                            done();
                        } );
                    } );
                } );
            } );
        } );
    } );

} );
