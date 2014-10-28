module.exports = {
    htmllint: {
        options: {
            ignore: [
                /* for HTML4.01 */
                //'Almost standards mode doctype. Expected �g<!DOCTYPE html>�h.',
                //'Bad value �gContent-Style-Type�h for attribute �ghttp-equiv�h on XHTML element �gmeta�h.',
                //'Bad value �gContent-Script-Type�h for attribute �ghttp-equiv�h on XHTML element �gmeta�h.',

                /* for Yahoo! tag */
                //'The �gframeborder�h attribute on the �giframe�h element is obsolete. Use CSS instead.',
                //'The �gscrolling�h attribute on the �giframe�h element is obsolete. Use CSS instead.',
                //'The �gmarginheight�h attribute on the �giframe�h element is obsolete. Use CSS instead.',
                //'The �gmarginwidth�h attribute on the �giframe�h element is obsolete. Use CSS instead.'
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