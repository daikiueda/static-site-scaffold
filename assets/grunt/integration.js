var chalk = require( "chalk" );

module.exports = {

    watch: {
        css: {
            files: [ "css/**/*.scss" ],
            tasks: [ "css" ]
        },
        js: {
            files: [ "js/**/*.js" ],
            tasks: [ "js" ]
        }
    },

    browserSync: {
        htdocs: {
            bsFiles: {
                src: "<%= env.htdocs %>/**/*.*"
            },
            options: {
                browser: [ "google chrome" ], //, "firefox", "safari" ],
                server: {
                    baseDir: "<%= env.htdocs %>"
                },
                watchTask: true
            }
        }
    },

    attention: {
        server: {
            options: {
                message: [
                    "Server started at ",
                    chalk.underline.cyan( "http://localhost:3000/" ),
                        "\n and File Watching ... " + chalk.inverse( " Ctrl + C " ) + " to exit."
                ].join( "" ),
                border: "thin",
                borderColor: 'blue'
            }
        }
    },


    connect: {
        htdocs: {
            options: {
                port: 8000,
                hostname: "localhost",
                base: "<%= env.htdocs %>"
            }
        }
    },
    
    dump_pages: {
        main: {
            options: {
                urlRoot: [
                    "http://localhost",
                    ":<%= connect.htdocs.options.port %>"
                ].join( "" ),
                widths: [ 640, 1024 ],
                dest: "__screen_shot",

                // https://github.com/brenden/node-webshot#options
                webshot: {
                    defaultWhiteBackground: true
                }
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

    clean: {
        generated: [
            "tmp",
            
            "../htdocs/*",
            "!../htdocs/Templates",
            "!../htdocs/__modules",

            "test/tmp",

            "css/common/css/design_schemes/_icon.scss",
            "doc/css",
            "<%= jsdoc.main.options.destination %>",
            "<%= dump_pages.main.options.dest %>"
        ]
    }
};