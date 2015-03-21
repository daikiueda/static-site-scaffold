module.exports = {
    uglify: {
        options: {
            beautify: "<%= env.debug %>",
            compress: {
                global_defs: {
                    DEBUG: "<%= env.debug %>"
                },
                dead_code: true
            },
            preserveComments: "some"
        },
        libs: {
            src: [
                "<%= env.assets %>/bower_components/jquery/dist/jquery.js"
            ],
            dest: "<%= env.htdocs %>/common/js/libs.js"
        },
        common: {
            src: [
                "<%= env.assets %>/js/common/$.namespace.js",
                "<%= env.assets %>/js/common/**/*.js"
            ],
            dest: "<%= env.htdocs %>/common/js/common.js"
        }
    },

    karma: {
        common: {
            configFile: "<%= env.assets %>/test/karma.conf.js",
            singleRun: true,
            browsers: [ "PhantomJS" ]
        },
        common_browsers: {
            configFile: "<%= env.assets %>/test/karma.conf.js",
            singleRun: false,
            browsers: [ "PhantomJS", "Chrome", "Firefox", "Safari", "IE" ]
        }
    },

    browserify: {
        common: {
            files: {
                "<%= env.assets %>/test/tmp/common/siteScript/testem.common.browserified.js": [
                    "<%= env.assets %>/test/common/siteScript/**/*browserify*.js"
                ],
                "<%= env.assets %>/test/tmp/common/siteScript/karma.common.browserified.js": [
                    "<%= env.assets %>/test/common/siteScript/**/*browserify*.js"
                ]
            }
        }
    },

    jsdoc : {
        main : {
            src: [ "<%= env.assets %>/js/**/*.js", "<%= env.assets %>/js/**/*.jsdoc" ],
            options: {
                configure: "<%= env.assets %>/js/jsdoc.conf.json",
                destination: "<%= env.assets %>/doc/js"
            }
        }
    },

    cat: {
        coverage: { src: "<%= env.assets %>/test/tmp/__coverage/*/coverage.txt" }
    },

    clean: {
        test: {
            src: [ "<%= env.assets %>/test/tmp" ],
            options: {
                force: true
            }
        }
    },

    replace: {
        license_comment_format: {
            src: [ "<%= env.htdocs %>/common/js/libs.js" ],
            overwrite: true,
            replacements: [
                { from: /\/\*\!/g, to: "\n/*!" },
                { from: /^\n+\/\*\!/g, to: "/*!" }
            ]
        },

        path_in_browserified_for_karma: {
            src: [ "<%= env.assets %>/test/tmp/**/karma*browserified*.js" ],
            overwrite: true,
            replacements: [
                { from: / src="\//g, to: " src=\"/base/" }
            ]
        }
    }
};
