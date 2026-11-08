const LoginPage = require('../pages/login.page');
const step = require('../utils/step');
const users = require('../../resources/test-data/users.json');
const credentials = require('../../config/credentials');
const messages = require('../../resources/test-data/messages.json');

describe('Login', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('shows an error for an invalid email', async () => {
        await LoginPage.login(users.invalidEmail.email, users.invalidEmail.password);

        await step('Verify the invalid email error is shown', async () => {
            await expect(LoginPage.emailError).toBeDisplayed();
            await expect(LoginPage.emailError).toHaveText(messages.validation.invalidEmail);
        });
    });

    it('shows an error for a password shorter than 8 characters', async () => {
        await LoginPage.login(users.shortPassword.email, users.shortPassword.password);

        await step('Verify the short password error is shown', async () => {
            await expect(LoginPage.passwordError).toHaveText(messages.validation.shortPassword);
        });
    });

    it('shows errors when all fields are empty', async () => {
        await LoginPage.loginWithEmptyFields();

        await step('Verify the email and password errors are shown', async () => {
            await expect(LoginPage.emailError).toHaveText(messages.validation.invalidEmail);
            await expect(LoginPage.passwordError).toHaveText(messages.validation.shortPassword);
        });
    });

    it('logs in with a valid email and password', async () => {
        await LoginPage.login(credentials.email, credentials.password);

        await step('Verify the success alert is shown', async () => {
            await expect(LoginPage.alertTitle).toHaveText(messages.login.successTitle);
            await expect(LoginPage.alertMessage).toHaveText(messages.login.successMessage);
        });
        await LoginPage.acceptAlert();
    });
});
