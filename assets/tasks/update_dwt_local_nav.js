/**
 * Update localNav in .dwt
 */

"use strict";

var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    Q = require( "q" ),

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


function updateHTML( htmlDir, metadata, options ){
    var jsdom = require( "jsdom" ),

        deferred = Q.defer();

    try {
        var filePath = path.join( htmlDir, metadata.path ),
            content = fs.readFileSync( filePath, options.charset ),
            document = jsdom.jsdom( content ),
            window = document.createWindow();

        jsdom.jQueryify(
            window,
            function( window, $ ){


//            $( options.localNavElm ).empty();
//
//            dirPaths.forEach( function( dirPath ){
//                localNavItemsStr = [];
//                _.where( pages, { _dirPath: dirPath } ).forEach( function( page ){
//                    localNavItemsStr.push( localNavItemTemplate( page ) );
//                } );
//
//                $( options.localNavElm ).append(
//                    localNavContainerTemplate( { items: localNavItemsStr.join( "" ) } )
//                );
//            } );



                $( "script.jsdom" ).remove();

                var htmlCode = $( "html" ).html();
                _.forEach( UNLIKE_STRINGS, function( correct, unlike ){
                    htmlCode = htmlCode.replace( new RegExp( unlike, "g" ), correct );
                } );

                fs.writeFileSync(
                    filePath,
                    content.replace(
                        /([\S\s]*<html[^>]*>)[\S\s]*(<\/html>[\S\s]*)/,
                            "$1" + htmlCode + "$2"
                    ),
                    options.charset
                );

                deferred.resolve( filePath + " ... updated." );
            }
        );
    } catch( e ){
        deferred.reject( e );
    }

    return deferred.promise;
}


/**
 * メタデータの、各レコード（ページ情報）に以下のプロパティを追加して、返却する。
 *
 *  * _order {Array} Excelファイル上の順番（ソート用）
 *  * _dirPath {String} 該当ページが属するディレクトリのパス
 *  * _topicPathTitles {Array} ルート階層からのカテゴリー名の配列（パン屑ナビ向け）
 *  * _localFiles {Array} 該当ファイルが属するディレクトリに配置されるファイルの一覧
 *
 * @param {Array} metadata
 * @returns {Array}
 */
function extendMetadata( metadata ){
    var extendedMetadata = [],
        topicPathTitles = {},
        localFiles = {},
        dirPaths;

    // すべてのページ情報に、_orderと_dirPathを追加する。
    metadata.forEach( function( page, index ){
        if( page.path ){
            page._order = index;
            page._dirPath = page.path.replace( /\/[^\/]+$/, "/" );
            extendedMetadata.push( page );
        }
    } );

    // ディレクトリパスの一覧（重複なく・漏れなく）
    dirPaths = _.chain( extendedMetadata ).pluck( "_dirPath" ).uniq().value();

    dirPaths.forEach( function( dirPath ){

        // ディレクトリ階層上のディレクトリ名を配列に分割。
        var dirNames = dirPath.replace( /\/$/g, "" ).split( "/" );

        topicPathTitles[ dirPath ] =
            dirNames.map( function( dirName, index ){
                return _.find(
                    extendedMetadata,
                    { path: dirNames.slice( 0, index + 1 ).join( "/" ) + "/index.html" }
                ).title
            } );

        localFiles[ dirPath ] = [];

        // 対象のディレクトリパスに配置されてすべてのページに、
        // _localFilesと_topicPathTitlesの情報を追加する。
        _.where( extendedMetadata, { _dirPath: dirPath } ).forEach( function( page ){
            localFiles[ dirPath ].push( { _filename: page.filename, _title: page.title } );
            page._localFiles = localFiles[ dirPath ];
            page._topicPathTitles = topicPathTitles[ dirPath ];
        } );
    } );

    return extendedMetadata;
}


module.exports = function( grunt ){
    grunt.registerMultiTask( "update_local_nav", "Update navigation in .html files.", function(){

        var xlsx2json = require( XLSX2JSON_PATH ),

            options = this.options( {
                charset: "utf-8"
            } ),

            done = this.async();

        xlsx2json( this.data.xlsx, options )
            .then(
                function( metadata ){
                    var extendedMetadata = extendMetadata( metadata );

                    Q.all( extendedMetadata.map( function( pageMetadata ){
                        return updateHTML( this.data.htmlDir, pageMetadata, options )
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