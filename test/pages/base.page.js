const locators = require('../../resources/ui-locators/common.locators');
const step = require('../utils/step');

module.exports = class BasePage {
    get alertTitle() { return $(locators.alertTitle); }
    get alertMessage() { return $(locators.alertMessage); }
    get alertOkButton() { return $(locators.alertOkButton); }

    async acceptAlert() {
        await step('Accept the alert', async () => {
            await this.alertOkButton.click();
        });
    }

    // The keyboard can cover buttons, so close it before tapping them
    async hideKeyboardIfShown() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }
};
