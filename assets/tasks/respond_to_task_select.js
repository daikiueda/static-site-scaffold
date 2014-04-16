/**
 * Respond to task select
 */


"use strict";

var chalk = require( "chalk" ),

    TASK_MENU_TASK_NAME_STR = "task_menu",
    SELECTED_TASK_VAR_NAME_STR = "selectedTask",
    QUIT_MSG_STR = [
        chalk.gray( "No tasks run. Exit task menu.\n" ),
        "If you need task menu again, call \"" + chalk.yellow( "grunt" ) + "\"! ",
        "See you next" + chalk.green( " :)" )
    ].join( "" );
    

module.exports = function( grunt ){
    grunt.registerTask( "respond_to_task_select", function(){
        var selectedTask = grunt.config( SELECTED_TASK_VAR_NAME_STR );
        if( selectedTask ){
            if( selectedTask !== TASK_MENU_TASK_NAME_STR ){
                grunt.task.run( selectedTask );
            }
            grunt.task.run( TASK_MENU_TASK_NAME_STR );
        }
        else {
            grunt.log.writeln( "\n" + QUIT_MSG_STR );
        }
    } );
};