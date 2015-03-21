/**
 * grunt.registerTask
 *  - css
 *  - cssdoc
 */

"use strict";

module.exports = function( grunt ){

    // css
    grunt.registerTask( "css", "Compile .scss to .css, and generate webfont.", [
        "webfont",
        "compass:main_clean",
        "compass:main"
    ] );

    // cssdoc
    grunt.registerTask( "cssdoc", "Generate CSS styleguide, including sample style.", [
        "clean:cssdoc",
        "webfont",
        "compass:main_clean",
        "compass:main_for_cssdoc",
        "styleguide:common",
        "compass:main_clean",
        "compass:main"
    ] );
};