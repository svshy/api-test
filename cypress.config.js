const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.github.com",
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
