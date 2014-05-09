module.exports = {
    htmllint: {
        main: {
            src: [
                "../htdocs/**/*.html",
                "!../htdocs/__modules/**/*.html",
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
            localNavHTML: "../htdocs/Templates/contents_page.dwt",
            localNavElm: "nav#localNav"
        }
    }
};