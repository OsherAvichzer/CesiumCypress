// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Failed to fetch")) return false;
  return true;
});

// Cypress.on("log:added", (options) => {
//   if (options.instrument === "command" && options.name === "request") {
//     // Suppress logs for map GET requests
//     debugger;

//     options.message = ""; // Clears the message in the console
//   }
// });

Cypress.on("log:added", (log) => {
    if (log.instrument === "command" && log.name === "request" && log.message.includes("map")) {
      // Suppress the log in Cypress Test Runner
      log.message = "";
  
      // Suppress the browser console log
      console.debug = () => {}; // Temporarily override console.debug
    }
  });

  