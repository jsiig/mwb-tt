var webpackConfig = require('./node_modules/@vue/cli-service/webpack.config.js')
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['tests/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },

    browsers: ['ChromeHeadless']
  })
}
