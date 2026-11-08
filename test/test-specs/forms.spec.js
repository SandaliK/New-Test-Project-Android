const FormsPage = require('../pages/forms.page');
const step = require('../utils/step');
const messages = require('../../resources/test-data/messages.json');

describe('Forms', () => {
    beforeEach(async () => {
        await FormsPage.open();
    });

    it('shows the text typed into the input field', async () => {
        await FormsPage.typeText(messages.forms.typedText);

        await step('Verify the typed text is shown below the input', async () => {
            await expect(FormsPage.inputResult).toHaveText(messages.forms.typedText);
        });
    });

    it('changes the switch text when the switch is toggled', async () => {
        await step('Verify the switch starts in the ON state text', async () => {
            await expect(FormsPage.switchText).toHaveText(messages.forms.switchOn);
        });

        await FormsPage.toggleSwitch();

        await step('Verify the switch text changed to OFF', async () => {
            await expect(FormsPage.switchText).toHaveText(messages.forms.switchOff);
        });
    });

    it('shows an alert when the Active button is tapped', async () => {
        await FormsPage.tapActiveButton();

        await step('Verify the active button alert is shown', async () => {
            await expect(FormsPage.alertMessage).toHaveText(messages.forms.activeButtonAlert);
        });
        await FormsPage.acceptAlert();
    });
});
