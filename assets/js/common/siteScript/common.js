/**
 * Common Script
 */

/** @namespace siteScript */
$.namespace( "siteScript" );

(function( siteScript ){
    "use strict";

    /** @function */
    siteScript.testFunction = function(){
        console.warn( "* scaffoldのサンプルコードが残っています。common/siteScript/common.jsの内容を始末してください。" );
    };

    $( function(){
        siteScript.testFunction();
    } );
})( $.namespace.getRoot() );