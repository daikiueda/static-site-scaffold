module.exports = {
    webfont: {
        common_icons: {
            src: "<%= env.assets %>/font-svg/icon/*.svg",
            dest: "<%= env.htdocs %>/common/fonts/icon",
            destCss: "<%= env.assets %>/css/common/css/design_schemes",
            options: {
                engine: "node",
                font: "icon",
                hashes: false,
                types: "eot,woff,ttf,svg",
                stylesheet: "scss",
                relativeFontPath: "../fonts/icon",
                template: "<%= env.assets %>/font-svg/icon/icon.css",
                htmlDemo: false,
                embed: false
            }
        }
    },

    compass: {
        main: {
            options: {
                basePath: "<%= env.assets %>/css",
                config: "<%= env.assets %>/css/config.rb",
                environment: "production"
            }
        },
        main_for_cssdoc: {
            options: {
                basePath: "<%= compass.main.options.basePath %>",
                config: "<%= compass.main.options.config %>",
                environment: "development"
            }
        },
        main_clean: {
            options: {
                basePath: "<%= compass.main.options.basePath %>",
                config: "<%= compass.main.options.config %>",
                clean: true
            }
        }
    },

    styleguide: {
        options: {
            framework: {
                name: "styledocco"
            }
        },
        common: {
            options: {
                template: {
                    include: [
                        "<%= env.htdocs %>/css/common.css"
                    ]
                }
            },
            files: {
                "<%= env.assets %>/doc/css/common": "<%= env.assets %>/css/common/css/*"
            }
        }
    },

    clean: {
        cssdoc: [
            "<%= env.assets %>/doc/css/**/*.html",
            "<%= env.assets %>/doc/css/**/*.css"
        ]
    }
};
