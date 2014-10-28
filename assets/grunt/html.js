module.exports = {
    htmllint: {
        options: {
            ignore: [
                /* for HTML4.01 */
                //'Almost standards mode doctype. Expected Åg<!DOCTYPE html>Åh.',
                //'Bad value ÅgContent-Style-TypeÅh for attribute Åghttp-equivÅh on XHTML element ÅgmetaÅh.',
                //'Bad value ÅgContent-Script-TypeÅh for attribute Åghttp-equivÅh on XHTML element ÅgmetaÅh.',

                /* for Yahoo! tag */
                //'The ÅgframeborderÅh attribute on the ÅgiframeÅh element is obsolete. Use CSS instead.',
                //'The ÅgscrollingÅh attribute on the ÅgiframeÅh element is obsolete. Use CSS instead.',
                //'The ÅgmarginheightÅh attribute on the ÅgiframeÅh element is obsolete. Use CSS instead.',
                //'The ÅgmarginwidthÅh attribute on the ÅgiframeÅh element is obsolete. Use CSS instead.'
            ]
        },
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