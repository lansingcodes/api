process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      '../src/!(routes)/!(app).js',
      '**/*.test.js'
    ],
    preprocessors: {
      '../src/!(routes)/!(app).js': ['webpack', 'coverage'],
      '**/*.test.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      dir: './coverage',
      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      },
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary'}
      ]
    }
  });
};
