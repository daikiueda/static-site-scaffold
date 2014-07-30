/**
 * grunt.registerTask
 *  - update_nav_excel
 */

"use strict";

var XLSX2JSON_PATH = "../../node_modules/grunt-meta-excel/node_modules/xlsx2json/lib/xlsx2json.js",

    fs = require( "fs" ),
    _ = require( "lodash" );

module.exports = function( grunt ){
    grunt.registerMultiTask( "update_nav_excel", "Update navigation in .html files.", function(){

        var Q = require( "q" ),
            xlsx2json = require( XLSX2JSON_PATH ),

            htmlDir = this.data.htmlDir,

            options = this.options( {
                charset: "utf-8"
            } ),

            templates = prepareNavTemplates( this.data.templates, options ),

            done = this.async();

        xlsx2json( this.data.xlsx, options )
            .then(
                function( metadata ){
                    var extendMetadata = require( "./lib/extendMetadata.js" ),
                        updateNavExcel = require( "./lib/updateNavExcel" ),
                        extendedMetadata = extendMetadata( metadata );

                    extendedMetadata.reduce( function( previousProcess, pageMetadata ){
                        return previousProcess.then( function(){
                            return updateNavExcel( htmlDir, pageMetadata, templates, options )
                                .then(
                                    function( message ){ grunt.log.ok( message ) },
                                    function( message ){ grunt.log.warn( message ) }
                                );
                        } );
                    }, Q() )
                        .then(
                            function(){ done(); },
                            function(){ done( false ); }
                        );
                },

                function(){ done( false ); }
            );
    } );
};

function prepareNavTemplates( templatesFilePathsMap, options ){

    var templates = {};

    _.forEach( templatesFilePathsMap, function( templateFilePath, targetSelector ){
        templates[ targetSelector ] =
            _.template( fs.readFileSync( templateFilePath, options.charset ) );
    } );

    return templates;
}