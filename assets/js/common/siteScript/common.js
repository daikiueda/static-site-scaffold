/**
 * Common Script
 */

/** @namespace siteScript */
$.namespace( "siteScript" );

(function( siteScript ){
    "use strict";

    /** @function */
    siteScript.testFunction = function(){
        console.log( "this is test." );
    };

    $( function(){
        siteScript.testFunction();
    } );
})( $.namespace.getRoot() );