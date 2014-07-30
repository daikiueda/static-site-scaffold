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
                "bower_components/jquery/dist/jquery.js"
            ],
            dest: "../htdocs/common/js/libs.js"
        },
        common: {
            src: [
                "js/common/$.namespace.js",
                "js/common/**/*.js"
            ],
            dest: "../htdocs/common/js/common.js"
        }
    },

    karma: {
        common: {
            configFile: "test/karma.conf.js",
            singleRun: true,
            browsers: [ "PhantomJS" ]
        },
        common_browsers: {
            configFile: "test/karma.conf.js",
            singleRun: false,
            browsers: [ "PhantomJS", "Chrome", "Firefox", "Safari", "IE" ]
        }
    },

    browserify: {
        common: {
            files: {
                "test/tmp/common/siteScript/testem.common.browserified.js": [
                    "test/common/siteScript/**/*browserify*.js"
                ],
                "test/tmp/common/siteScript/karma.common.browserified.js": [
                    "test/common/siteScript/**/*browserify*.js"
                ]
            }
        }
    },

    jsdoc : {
        main : {
            src: [ "js/**/*.js", "js/**/*.jsdoc" ], 
            options: {
                configure: "js/jsdoc.conf.json",
                destination: "doc/js"
            }
        }
    },

    cat: {
        coverage: { src: "test/tmp/__coverage/*/coverage.txt" }
    },

    clean: {
        test: [ "test/tmp" ]
    },
    
    replace: {
        license_comment_format: {
            src: [ "../htdocs/common/js/libs.js" ],
            overwrite: true,
            replacements: [
                { from: /\/\*\!/g, to: "\n/*!" },
                { from: /^\n+\/\*\!/g, to: "/*!" }
            ]
        },

        path_in_browserified_for_karma: {
            src: [ "test/tmp/**/karma*browserified*.js" ],
            overwrite: true,
            replacements: [
                { from: / src="\//g, to: " src=\"/base/" }
            ]
        }
    }
};