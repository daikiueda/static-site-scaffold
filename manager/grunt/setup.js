module.exports = {
    copy: {
        ionicons: {
            files: [
                {
                    expand: true,
                    dest: "<%= env.assets %>/font-svg/icon/",
                    cwd: "<%= env.assets %>/bower_components/ionicons/src/",
                    src: [
                        "ios7-arrow-back.svg",
                        "ios7-arrow-forward.svg",
                        "ios7-arrow-up.svg",
                        "ios7-arrow-down.svg",
                        "ios7-arrow-left.svg",
                        "ios7-arrow-right.svg",
                        "ios7-arrow-thin-up.svg",
                        "ios7-arrow-thin-down.svg",
                        "ios7-arrow-thin-left.svg",
                        "ios7-arrow-thin-right.svg",
                        "ios7-browsers.svg",
                        "ios7-browsers-outline.svg"
                    ]
                }
            ]
        },
        normalize: {
          src: "<%= env.assets %>/bower_components/normalize.css/normalize.css",
          dest: "<%= env.assets %>/bower_components/normalize.css/_normalize.scss"
        }
    }
};
