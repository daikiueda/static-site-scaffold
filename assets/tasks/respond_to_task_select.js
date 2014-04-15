/**
 *
 */


"use strict";

var chalk = require( "chalk" );

module.exports = function( grunt ){
    grunt.registerTask( "respond_to_task_select", function(){
        if( grunt.config( "selectedTask" ) ){
            grunt.task.run( grunt.config( "selectedTask" ) );
        }
        else {
            var smile = chalk.green( " :)" );
            grunt.log.writeln( "No tasks run. See you next" + smile );
        }
    } );
};