import { BasePage } from "./BasePage.js";

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = '//h6[text()="Dashboard"]';
        this.userDropdown = "span.oxd-userdropdown-tab";
        this.logoutLink = "a[href='/web/index.php/auth/logout']";
    }

    async getHeadersTitle() {
        return await this.getText(this.header);
    }

    async logout() {
        await this.click(this.userDropdown);
        await this.click(this.logoutLink);
    }
}
