const BasePage = require('./base.page');
const locators = require('../../resources/ui-locators/login.locators');
const step = require('../utils/step');

class LoginPage extends BasePage {
    get loginTabButton() { return $(locators.loginTabButton); }
    get loginMode() { return $(locators.loginMode); }
    get signUpMode() { return $(locators.signUpMode); }
    get emailInput() { return $(locators.emailInput); }
    get passwordInput() { return $(locators.passwordInput); }
    get repeatPasswordInput() { return $(locators.repeatPasswordInput); }
    get loginButton() { return $(locators.loginButton); }
    get signUpButton() { return $(locators.signUpButton); }
    get emailError() { return $(locators.emailError); }
    get passwordError() { return $(locators.passwordError); }
    get repeatPasswordError() { return $(locators.repeatPasswordError); }

    async open() {
        await step('Open the Login tab', async () => {
            await this.loginTabButton.click();
        });
    }

    async login(email, password) {
        await step('Enter the email and password and log in', async () => {
            await this.loginMode.click();
            await this.emailInput.setValue(email);
            await this.passwordInput.setValue(password);
            await this.hideKeyboardIfShown();
            await this.loginButton.click();
        });
    }

    async loginWithEmptyFields() {
        await step('Log in with all fields empty', async () => {
            await this.loginMode.click();
            await this.emailInput.clearValue();
            await this.passwordInput.clearValue();
            await this.hideKeyboardIfShown();
            await this.loginButton.click();
        });
    }

    async signUp(email, password, repeatPassword = password) {
        await step('Enter the email, password and repeat password and sign up', async () => {
            await this.signUpMode.click();
            await this.emailInput.setValue(email);
            await this.passwordInput.setValue(password);
            await this.repeatPasswordInput.setValue(repeatPassword);
            await this.hideKeyboardIfShown();
            await this.signUpButton.click();
        });
    }

    async signUpWithEmptyFields() {
        await step('Sign up with all fields empty', async () => {
            await this.signUpMode.click();
            await this.emailInput.clearValue();
            await this.passwordInput.clearValue();
            await this.repeatPasswordInput.clearValue();
            await this.hideKeyboardIfShown();
            await this.signUpButton.click();
        });
    }
}

module.exports = new LoginPage();
