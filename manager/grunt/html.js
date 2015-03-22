module.exports = {
    htmllint: {
        options: {
            ignore: [
            ]
        },
        main: {
            src: [
                "<%= env.htdocs %>/**/*.html"
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
            htmlDir: "<%= env.htdocs %>",
            options: {
                patternsJsonPath: "./grunt/settings/meta_tags_patterns.json",
                boilerplate: "<%= env.assets %>/html/boilerplate/contents_page.html"
            }
        }
    },

    htmlcommenttemplate: {
        main: {
            templatesDir: "<%= env.assets %>/html/Templates",
            html: [
                "<%= env.htdocs %>/**/*.html"
            ]
        },
        boilerplate: {
            templatesDir: "<%= env.assets %>/html/Templates",
            html: [
                "<%= env.assets %>/html/boilerplate/**/*.html"
            ]
        },
    },

    update_nav_excel: {
        options: {
            dataStartingRow: "<%= env.sitemapExcel.dataStartingRow %>",
            mapping: "<%= env.sitemapExcel.mapping %>"
        },
        main: {
            xlsx: "<%= env.sitemapExcel.path %>",
            htmlDir: "<%= env.htdocs %>",
            templates: {
                "#topic_path": "<%= env.assets %>/html/fragments/nav_topic_path.html",
                "aside nav.local": "<%= env.assets %>/html/fragments/aside_nav_local.html"
            }
        }
    }
};
