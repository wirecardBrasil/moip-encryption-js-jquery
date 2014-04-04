module.exports = function(config) {
    config.set({

        // frameworks to use
        frameworks: ['sinon', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'lib/jquery-2.1.0.min.js',
            'lib/jasmine-jquery.js',
            'lib/jsencrypt.min.js',
            'src/build/development_environment.js',
            'src/*.js',
            'spec/helpers/*.js',
            'spec/*.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // test results reporter to use
        reporters: ['story', 'coverage'],

        preprocessors: {
          'src/*.js': ['coverage']
        },

        coverageReporter: {
          type: 'html',
          dir: 'build/coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
