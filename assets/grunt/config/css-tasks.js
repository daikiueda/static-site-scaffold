module.exports = {
    webfont: {
        common_icons: {
            src: "font-svg/icon/*.svg",
            dest: "../htdocs/common/fonts/icon",
            destCss: "css/common/css/design_schemes",
            options: {
                engine: "node",
                font: "icon",
                hashes: false,
                stylesheet: "scss",
                relativeFontPath: "../fonts/icon",
                template: "font-svg/icon/icon.css",
                htmlDemo: false,
                embed: false
            }
        }
    },

    compass: {
        main: {
            options: {
                basePath: "css",
                config: "css/config.rb",
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
                        "../htdocs/common/css/common.css"
                    ]
                }
            },
            files: {
                "doc/css/common": "css/common/css/*"
            }
        }
    },

    clean: {
        cssdoc: [
            "doc/css/**/*.html",
            "doc/css/**/*.css"
        ]
    }
};