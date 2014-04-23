/**
 * 汎用バリデーション
 * @namespace siteScript.utils.validation
 */
$.namespace( "siteScript.utils.validation" );

(function( siteScript ){
    "use strict";

    /** @function */
    siteScript.utils.validation.testFunction = function(){
        console.warn( "* scaffoldのサンプルコードが残っています。common/siteScript/utils/validation.jsを始末してください。" );
    };

    $( function(){
        siteScript.utils.validation.testFunction();
    } );
})( $.namespace.getRoot() );