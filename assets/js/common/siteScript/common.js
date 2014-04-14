/**
 * Common Script
 */

$.namespace( "siteScript" );

(function( siteScript ){
    "use strict";

    siteScript.testFunction = function(){
        console.log( "this is test." );
    };

    $( function(){
        siteScript.testFunction();
    } );
})( $.namespace.getRoot() );