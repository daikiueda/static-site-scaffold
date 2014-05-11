var chalk = require( "chalk" );

module.exports = {
    connect: {
        livereload: {
            options: {
                port: 8000,
                hostname: "localhost",
                base: "../htdocs",
                livereload: true
            }
        }
    },
    
    open: {
        main: {
            path: [
                "http://<%= connect.livereload.options.hostname %>",
                ":<%= connect.livereload.options.port %>"
            ].join( "" )
        }
    },

    watch: {
        options: {
            nospawn: true,
            livereload: true
        },
        css: {
            files: [ "css/**/*.scss" ],
            tasks: [ "css" ]
        },
        js: {
            files: [ "js/**/*.js" ],
            tasks: [ "js" ]
        }
    },

    dump_pages: {
        main: {
            options: {
                urlRoot: [
                    "http://<%= connect.livereload.options.hostname %>",
                    ":<%= connect.livereload.options.port %>"
                ].join( "" ),
                widths: [ 640, 1024 ],
                dest: "__screen_shot"
            },
            files: [ {
                expand: true,
                cwd: "../htdocs",
                src: "**/*.html"
            } ]
        }
    },

    prompt: {
        task_menu: {
            options: {
                questions: "<%= task_menu %>"
            }
        }
    },

    attention: {
        server: {
            options: {
                message: [
                    "Server started at ",
                    chalk.underline.cyan(
                        "http://<%= connect.livereload.options.hostname %>:<%= connect.livereload.options.port %>/"
                    ),
                    "\n and File Watching ... " + chalk.inverse( " Ctrl + C " ) + " to exit."
                ].join( "" ),
                border: "thin",
                borderColor: 'blue'
            }
        }
    },

    clean: {
        generated: [
            "tmp",
            
            "../htdocs/*",
            "!../htdocs/Templates",
            "!../htdocs/__modules",

            "css/common/css/design_schemes/_icon.scss",
            "doc/css/**/*.*",
            "<%= jsdoc.main.options.destination %>",
            "<%= dump_pages.main.options.dest %>"
        ]
    }
};