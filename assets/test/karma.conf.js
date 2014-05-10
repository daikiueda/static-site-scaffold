// Karma configuration
// Generated on Fri Apr 25 2014 04:49:48 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',

      "js/common/siteScript/$.namespace.js",
      "js/common/siteScript/**/*.js",
      'js/**/*.js',
      
      'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'test/__scaffold/**/*.conf.js',
      'test/**/*.conf.js',
      'test/**/*browserify*.js',
      'test/**/testem.*.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [
        { type : 'lcov', dir : 'test/tmp/__coverage/' },
        { type : 'text', dir : 'test/tmp/__coverage/', file: "coverage.txt" }
      ]
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/**/*.js': ['coverage']
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
