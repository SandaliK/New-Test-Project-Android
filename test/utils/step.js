const allure = require('@wdio/allure-reporter').default;

// Shows a named step in the Allure report
module.exports = (name, action) => allure.step(name, action);
