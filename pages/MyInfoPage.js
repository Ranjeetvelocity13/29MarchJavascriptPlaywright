import { BasePage } from "./BasePage.js";

export class MyInfoPage extends BasePage {
    constructor(page) {
        super(page);
        this.myInfoMenu = '//span[text()="My Info"]';
        this.firstNameInput = 'input[name="firstName"]';
        this.lastNameInput = 'input[name="lastName"]';

        // Use nth() to pick the correct Save button in the first form
        this.saveButton = '(//button[@type="submit"])[2]';

        this.employeeNameHeader =
            '//h6[@class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]';
    }

    async navigateToMyInfo() {
        await this.click(this.myInfoMenu);
    }

    async updateName(firstName, lastName) {
        await this.type(this.firstNameInput, firstName);
        await this.type(this.lastNameInput, lastName);
        await this.click(this.saveButton);
    }

    async getEmployeeName() {
        return await this.getText(this.employeeNameHeader);
    }
}
