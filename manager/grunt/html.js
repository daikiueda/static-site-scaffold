module.exports = {
    htmllint: {
        options: {
            ignore: [
            ]
        },
        main: {
            src: [
                "<%= env.htdocs %>/**/*.html",
                "!<%= env.htdocs %>/__modules/**/*.html"
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
                boilerplate: "../htdocs/__modules/__boilerplate.html"
            }
        }
    },

    htmlcommenttemplate: {
        main: {
          templatesDir: "<%= env.htdocs %>/Templates",
          html: "<%= env.htdocs %>/**/*.html"
        }
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
