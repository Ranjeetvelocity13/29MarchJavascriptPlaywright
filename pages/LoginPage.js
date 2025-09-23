import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.errorMessage = 'p.oxd-alert-content-text';
    }

    async gotoLoginPage(baseURL) {
        await this.page.goto(baseURL, { waitUntil: "networkidle" });
    }

    async login(username, password) {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }
}
