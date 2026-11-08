const BasePage = require('./base.page');
const locators = require('../../resources/ui-locators/forms.locators');
const step = require('../utils/step');

class FormsPage extends BasePage {
    get formsTabButton() { return $(locators.formsTabButton); }
    get textInput() { return $(locators.textInput); }
    get inputResult() { return $(locators.inputResult); }
    get switchToggle() { return $(locators.switchToggle); }
    get switchText() { return $(locators.switchText); }
    get activeButton() { return $(locators.activeButton); }

    async open() {
        await step('Open the Forms tab', async () => {
            await this.formsTabButton.click();
        });
    }

    async typeText(text) {
        await step(`Type "${text}" into the input field`, async () => {
            await this.textInput.setValue(text);
            await this.hideKeyboardIfShown();
        });
    }

    async toggleSwitch() {
        await step('Toggle the switch', async () => {
            await this.switchToggle.click();
        });
    }

    async tapActiveButton() {
        await step('Tap the Active button', async () => {
            await this.activeButton.click();
        });
    }
}

module.exports = new FormsPage();
