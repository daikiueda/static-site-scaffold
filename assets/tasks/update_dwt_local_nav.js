/**
 * Update localNav in .dwt
 */

"use strict";

var _ = require( "lodash" ),

    EOL = require( "os" ).EOL,
    INDENT_STR = "\t",

    LOCAL_NAV_CONTAINER_TEMPLATE = [
        EOL,
        indent( 5 ), '<ul>', EOL,
        '<%= items %>',
        indent( 5 ), '</ul>', EOL
    ].join( "" ),

    LOCAL_NAV_ITEM_TEMPLATE = [
        indent( 6 ), '<li><a href="..<%= path %>"><%= title %></a></li>', EOL
    ].join( "" ),

    XLSX2JSON_PATH = "../node_modules/grunt-meta-excel/node_modules/xlsx2json/lib/xlsx2json.js",

    UNLIKE_STRINGS = {
        "©": "&copy;",
        "™": "&trade;",
        "®": "&reg;"
    };

function indent( level ){
    return _.times( level, function(){ return INDENT_STR } ).join( "" );
}

function updateLocalNav( metadata, options, callback ){
    var fs = require( "fs" ),
        jsdom = require( "jsdom" ),

        content = fs.readFileSync( options.htmlFilePath, options.charset ),
        document = jsdom.jsdom( content ),
        window = document.createWindow(),

        localNavContainerTemplate = _.template( LOCAL_NAV_CONTAINER_TEMPLATE ),
        localNavItemTemplate = _.template( LOCAL_NAV_ITEM_TEMPLATE ),
        pages,
        dirPaths,
        localNavItemsStr;

    jsdom.jQueryify(
        window,
        function( window, $ ){

            $( options.localNavElm ).empty();

            pages = [];
            metadata.forEach( function( pageInfo, index ){
                if( pageInfo.path ){
                    pageInfo._order = index;
                    pageInfo._dirPath = pageInfo.path.replace( /\/[^\/]+$/, "/" );
                    pages.push( pageInfo );
                }
            } );

            dirPaths = _.chain( pages ).pluck( "_dirPath" ).uniq().value();

            dirPaths.forEach( function( dirPath ){
                localNavItemsStr = [];
                _.where( pages, { _dirPath: dirPath } ).forEach( function( page ){
                    localNavItemsStr.push( localNavItemTemplate( page ) );
                } );

                $( options.localNavElm ).append(
                    localNavContainerTemplate( { items: localNavItemsStr.join( "" ) } )
                );
            } );

            $( options.localNavElm ).append( indent( 4 ) );


            $( "script.jsdom" ).remove();

            var htmlCode = $( "html" ).html();
            _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
                htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
            } );

            fs.writeFileSync(
                options.htmlFilePath,
                content.replace(
                    /([\S\s]*<html[^>]*>)[\S\s]*(<\/html>[\S\s]*)/,
                        "$1" + htmlCode + "$2"
                ),
                options.charset
            );

            callback( true );
        }
    );
}

module.exports = function( grunt ){
    grunt.registerMultiTask( "update_local_nav", "Update local navigation in .dwt file.", function(){

        var xlsx2json = require( XLSX2JSON_PATH ),

            options = this.options( {
                charset: "utf-8",
                htmlFilePath: this.data.localNavHTML,
                localNavElm: this.data.localNavElm
            } ),

            done = this.async();

        xlsx2json( this.data.xlsx, options )
            .then(
                function( metadata ){
                    updateLocalNav( metadata, options, done );
                },
                function(){ done( false ); }
            );
    } );
};