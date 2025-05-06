const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  retries: {
    runMode: 1
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/tests/**/*.js'
  },
  env: {
    // Optional: use this if you want to set env inline
    // apiKey: "inline-fallback-key"
  }
});
