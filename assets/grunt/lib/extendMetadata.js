/*
 * Extend metadata.
 * Copyright (c) 2014 daikiueda, @ue_di
 */

"use strict";

var _ = require( "lodash" );

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
    dirPaths = _( extendedMetadata ).pluck( "_dirPath" ).uniq().value();

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
            localFiles[ dirPath ].push( { filename: page.filename, title: page.title } );
            page._localFiles = localFiles[ dirPath ];
            page._topicPathTitles = topicPathTitles[ dirPath ];
        } );
    } );

    return extendedMetadata;
}

module.exports = extendMetadata;
