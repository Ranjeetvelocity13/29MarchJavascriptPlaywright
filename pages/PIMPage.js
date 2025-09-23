import { BasePage } from "./BasePage.js";

export class PIMPage extends BasePage {
    constructor(page) {
        super(page);
        this.pimMenu = 'a[href="/web/index.php/pim/viewPimModule"]';
        this.addEmployeeButton = 'button:has-text("Add")';
        this.firstNameInput = 'input[name="firstName"]';
        this.lastNameInput = 'input[name="lastName"]';
        this.saveButton = 'button[type="submit"]';

        this.personalDetailsHeader = 'h6.oxd-text.oxd-text--h6.orangehrm-main-title';
        this.employeeNameLabel = '.orangehrm-edit-employee-name h6';
    }

    async gotoPIM() {
        await this.click(this.pimMenu);
    }

    async addEmployee(employee) {
        await this.click(this.addEmployeeButton);

        // ✅ use employee properties, not object itself
        await this.type(this.firstNameInput, employee.firstName);
        await this.type(this.lastNameInput, employee.lastName);
        await this.click(this.saveButton);
    }

    async getPersonalDetailsHeader() {
        return await this.getText(this.personalDetailsHeader);
    }

    async getEmployeeName() {
        return await this.getText(this.employeeNameLabel);
    }
}
