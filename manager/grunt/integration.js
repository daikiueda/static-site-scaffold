var chalk = require( "chalk" );

module.exports = {

    watch: {
        htmlcommenttemplate: {
            files: [ "<%= env.assets %>/html/Templates/**/*.*" ],
            tasks: [ "htmlcommenttemplate" ]
        },
        css: {
            files: [ "<%= env.assets %>/css/**/*.scss" ],
            tasks: [ "css" ]
        },
        js: {
            files: [ "<%= env.assets %>/js/**/*.js" ],
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
                hostname: [
                    '<%= ',
                    '    ( env.alternativeLocalServerName )?',
                    '        env.alternativeLocalServerName:',
                    '        "localhost:" + connect.htdocs.options.port',
                    '%>',
                ].join( "" ),
                widths: [ 640, 1024 ],
                dest: "__screen_shot",
                imageType: "png", // or "jpg"

                // https://github.com/brenden/node-webshot#options
                webshot: {
                    defaultWhiteBackground: true
                }
            },
            files: [ {
                expand: true,
                cwd: "<%= env.htdocs %>",
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

            "<%= env.htdocs %>/*",
            "!<%= env.htdocs %>/Templates",
            "!<%= env.htdocs %>/__modules",

            "test/{.,}tmp",
            "<%= env.assets %>/test/{.,}tmp",

            "<%= env.assets %>/css/common/css/design_schemes/_icon.scss",
            "<%= env.assets %>/doc/css",
            "<%= jsdoc.main.options.destination %>",
            "<%= dump_pages.main.options.dest %>"
        ]
    }
};
