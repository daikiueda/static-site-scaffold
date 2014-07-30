/**
 * grunt.registerTask
 *  - css
 *  - cssdoc
 */


"use strict";

module.exports = function( grunt ){

    // css
    grunt.registerTask( "css", [
        "webfont",
        "compass:main_clean",
        "compass:main"
    ] );

    // cssdoc
    grunt.registerTask( "cssdoc", [
        "clean:cssdoc",
        "webfont",
        "compass:main_clean",
        "compass:main_for_cssdoc",
        "styleguide:common",
        "compass:main_clean",
        "compass:main"
    ] );
};