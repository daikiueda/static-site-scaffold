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
    grunt.registerTask( "js", [
        "uglify",
        "replace:license_comment_format"
    ] );

    // test
    grunt.registerTask( "test", function(){
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
    grunt.registerTask( "before_testem", [
        "clean:test",
        "browserify:common"
    ] );
};