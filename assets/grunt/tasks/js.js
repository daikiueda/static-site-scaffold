/**
 * grunt.registerTask
 *  - js
 *  - test
 *  - before_testem
 *  - moveCoverageFiles
 */


"use strict";

module.exports = function( grunt ){

    // js
    grunt.registerTask( "js", "Combine and compress .js files.", [
        "uglify",
        "replace:license_comment_format"
    ] );

    // test
    grunt.registerTask( "test", "Test JavaScript.", function(){
        grunt.task.run( [
            "clean:test",
            "browserify:common",
            "replace:path_in_browserified_for_karma"
        ] );
        
        grunt.task.run(
            this.flags.browsers ?
                [ "karma:common_browsers" ]:
                [ "karma:common", "cat:coverage" ]
        );
    } );

    // before_testem
    grunt.registerTask( "before_testem", "[NOT FOR CLI] Prepare resource files for Testem.", [
        "clean:test",
        "browserify:common"
    ] );
};