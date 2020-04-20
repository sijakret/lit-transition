const webpack = require('./webpack.config');
const webpackMerge = require('webpack-merge');
const path = require('path');

// delete entry from webpack
delete webpack.entry;

module.exports = (config) => {
  config.set({
    browsers: [
      'ChromeHeadless'
    ],
    files: [
      'test/index.js'
    ],
    // frameworks to use
    frameworks: ['mocha'],

    plugins: [
      require("karma-webpack"),
      require("istanbul-instrumenter-loader"),
      require("karma-mocha"),
      require("karma-coverage"),
      require("karma-chrome-launcher"),
      require("karma-spec-reporter"),
      require("karma-coverage-istanbul-reporter")
    ],

    reporters: [
      'spec',
      'coverage-istanbul'
    ],

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',

        ui: 'tdd',
      }
    },

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*': ['webpack','coverage']
    },

    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary'],
 
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage'),
    },

    webpack: webpackMerge(webpack, {
      module: {
        rules: [
          {
            enforce: 'post',
            test: /\.ts$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: {
                esModules: true
              }
            }
          }
        ],
      }
    }),

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
  });
};