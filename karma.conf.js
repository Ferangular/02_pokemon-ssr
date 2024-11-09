// src/karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes configurar las opciones de Jasmine aquí.
        // `stopSpecOnExpectationFailure` puede ser útil para detener en el primer fallo.
        stopSpecOnExpectationFailure: false,
        random: false
      },
      clearContext: false // deja Jasmine Spec Runner visible en el navegador.
    },
    jasmineHtmlReporter: {
      suppressAll: true // oculta los detalles del fallo en el HTML
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
