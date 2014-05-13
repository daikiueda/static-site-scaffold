/**
 * grunt.registerTask
 *  - update_nav_excel
 */

"use strict";

module.exports = function( grunt ){
    grunt.registerMultiTask( "update_nav_excel", "Update navigation in .html files.", function(){

        var Q = require( "q" ),
            xlsx2json = require( "../node_modules/grunt-meta-excel/node_modules/xlsx2json/lib/xlsx2json.js" ),
            extendMetadata = require( "./lib/extendMetadata.js" ),
            updateNavExcel = require( "./lib/updateNavExcel" ),

            options = this.options( {
                charset: "utf-8"
            } ),

            done = this.async();


        xlsx2json( this.data.xlsx, options )
            .then(
                function( metadata ){
                    var extendedMetadata = extendMetadata( metadata );

                    Q.all( extendedMetadata.map( function( pageMetadata ){
                        return updateNavExcel( this.data.htmlDir, pageMetadata, options )
                            .then(
                                function( message ){ grunt.log.ok( message ) },
                                function( message ){ grunt.log.warn( message ) }
                            );
                    }, this ) )
                        .then(
                            function(){ done(); },
                            function(){ done( false ); }
                        );
                }.bind( this ),

                function(){ done( false ); }
            );
    } );
};