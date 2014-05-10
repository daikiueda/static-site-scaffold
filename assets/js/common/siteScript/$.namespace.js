/*
 * $.namespace.js
 * Copyright (c) 2014 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/static-site-scaffold
 */
(function( global ){
    "use strict";

    var NAMESPACE_ROOT_STRING = "siteScript",
        ATTR_NAME_FOR_GLOBAL_VARIABLE = "data-namespace",

        // namespaceメソッドを保持させる$オブジェクトの決定。
        // jQueryの使用を想定している。
        // jQueryが存在しない場合は、グローバルスコープに変数$を定義する。
        /** @namespace $ */
        $ = global.$ = ( global.$ ) ? global.$: /* istanbul ignore next */ {},

        // 名前空間の実体となるハッシュ。
        namespace = {};

    /* istanbul ignore if */
    if( $.namespace ){
        throw new Error( "$.namespaceの定義に失敗しました。scriptファイルの構成が想定外です。" );
    }

    namespace[ NAMESPACE_ROOT_STRING ] = {};

    /**
     * 名前空間の階層を定義する。
     * @name $.namespace
     * @function
     * @param {String} namesHierarchy ex. "siteScript.utils.validator" or "siteScript/utils/validator"
     */
    $.namespace = function( namesHierarchy ){
        var spaceNames,
            testHierarchy,
            testName;

        if( namesHierarchy.indexOf( NAMESPACE_ROOT_STRING ) !== 0 ){
            throw new Error( [
                "名前空間の定義に失敗しました。",
                "ルート階層が「" + NAMESPACE_ROOT_STRING + "」ではありません。",
                "（" + namesHierarchy + "）"
            ].join( "" ) );
        }

        testHierarchy = namespace;
        spaceNames = namesHierarchy.split( /[\.\/]/ );
        do {
            testName = spaceNames.shift();
            if( !testHierarchy[ testName ] ){
                testHierarchy[ testName ] = {};
            }
            testHierarchy = testHierarchy[ testName ];
        } while( spaceNames.length );
    };

    /**
     * 名前空間のルート階層を返却する。
     * @name $.namespace.getRoot
     * @function
     * @returns {Object}
     */
    $.namespace.getRoot = function(){
        return namespace[ NAMESPACE_ROOT_STRING ];
    };

    // 当scriptを呼び出す<script>要素にdata-namespace属性が設定されている場合は、
    // 属性値の文字列を名前とする変数をグローバルスコープに設け、そこに名前空間を公開する。
    ( function( global ){
        /* istanbul ignore if */
        if( !global.document ){
            return;
        }

        var loaderScriptElm =
                [].slice.apply( document.getElementsByTagName( "script" ) ).pop(),
            globalNamespaceStr =
                loaderScriptElm.getAttribute( ATTR_NAME_FOR_GLOBAL_VARIABLE );

        /* istanbul ignore if */
        if( globalNamespaceStr ){
            global[ globalNamespaceStr ] = namespace[ NAMESPACE_ROOT_STRING ];
        }
    } )( global );
})( window );
