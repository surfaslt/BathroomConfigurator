// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


exports.config = {
  //seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  // Use a custom framework adapter and set its relative path
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome'
  },
  chromeOnly: true,
  directConnect: true,
  chromeDriver: "./node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.24.exe",

  // Specs here are the cucumber feature files
  specs: [
    './e2e/features/*.feature'
  ],

  baseUrl: 'http://localhost:4200/',

  // cucumber command line options
  cucumberOpts: {
    // require step definition files before executing features
    require: ['./e2e/features/stepDefinitions/*.js'],
    // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    tags: false,
    // <boolean> fail if there are any undefined or pending steps
    format: 'pretty',
    // <boolean> invoke formatters without executing steps
    profile: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    'no-source': true
  },

  /*
  directConnect: true,

  // Enable TypeScript for the tests
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }
  */
};
