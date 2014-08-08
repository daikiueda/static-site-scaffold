module.exports = {
    htmllint: {
        main: {
            src: [
                "../htdocs/**/*.html",
                "!../htdocs/__modules/**/*.html"
            ]
        }
    },

    meta_excel: {
        options: {
            dataStartingRow: "<%= env.sitemapExcel.dataStartingRow %>",
            mapping: "<%= env.sitemapExcel.mapping %>"
        },
        main: {
            xlsx: "<%= env.sitemapExcel.path %>",
            htmlDir: "../htdocs/",
            options: {
                patternsJsonPath: "./grunt/settings/meta_tags_patterns.json",
                boilerplate: "../htdocs/__modules/__boilerplate.html"
            }
        }
    },

    update_nav_excel: {
        options: {
            dataStartingRow: "<%= env.sitemapExcel.dataStartingRow %>",
            mapping: "<%= env.sitemapExcel.mapping %>"
        },
        main: {
            xlsx: "<%= env.sitemapExcel.path %>",
            htmlDir: "../htdocs/",
            templates: {
                "#topic_path": "grunt/templates/nav_topic_path.html",
                "aside nav.local": "grunt/templates/aside_nav_local.html"
            }
        }
    }
};