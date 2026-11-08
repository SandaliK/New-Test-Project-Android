const LoginPage = require('../pages/login.page');
const step = require('../utils/step');
const users = require('../../resources/test-data/users.json');
const credentials = require('../../config/credentials');
const messages = require('../../resources/test-data/messages.json');

describe('Sign up', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('shows an error for a password shorter than 8 characters', async () => {
        await LoginPage.signUp(users.shortPassword.email, users.shortPassword.password);

        await step('Verify the short password error is shown', async () => {
            await expect(LoginPage.passwordError).toHaveText(messages.validation.shortPassword);
        });
    });

    it('shows an error when the repeated password does not match', async () => {
        await LoginPage.signUp(
            users.passwordMismatch.email,
            users.passwordMismatch.password,
            users.passwordMismatch.repeatPassword
        );

        await step('Verify the password mismatch error is shown', async () => {
            await expect(LoginPage.repeatPasswordError).toHaveText(messages.validation.passwordMismatch);
        });
    });

    it('shows errors when all fields are empty', async () => {
        await LoginPage.signUpWithEmptyFields();

        await step('Verify the email, password and repeat password errors are shown', async () => {
            await expect(LoginPage.emailError).toHaveText(messages.validation.invalidEmail);
            await expect(LoginPage.passwordError).toHaveText(messages.validation.shortPassword);
            await expect(LoginPage.repeatPasswordError).toHaveText(messages.validation.passwordMismatch);
        });
    });

    it('signs up with a valid email and password', async () => {
        await LoginPage.signUp(credentials.email, credentials.password);

        await step('Verify the sign up success alert is shown', async () => {
            await expect(LoginPage.alertTitle).toHaveText(messages.signUp.successTitle);
            await expect(LoginPage.alertMessage).toHaveText(messages.signUp.successMessage);
        });
        await LoginPage.acceptAlert();
    });
});
