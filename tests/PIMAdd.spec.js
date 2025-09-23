import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { PIMPage } from "../pages/PIMPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import envConfig from "../config/envConfig.js";
import DataHelper from "../utils/DataHelper.js";

test.describe("OrangeHRM PIM Tests", () => {
    test("Add a new employee with dynamic data", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const pimPage = new PIMPage(page);

        // Step 1: Login
        await loginPage.gotoLoginPage(envConfig.baseURL);
        await loginPage.login(envConfig.username, envConfig.password);

        // Step 2: Validate Dashboard
        const header = await dashboardPage.getHeadersTitle();
        expect(header).toContain("Dashboard");

        // Step 3: Generate random employee
        const employee = DataHelper.generateEmployee();
        console.log("Generated Employee:", employee);

        // Step 4: Add Employee
        await pimPage.gotoPIM();
        await pimPage.addEmployee(employee);

        // Step 5: Validate Personal Details Page
        const detailsHeader = await pimPage.getPersonalDetailsHeader();
        expect(detailsHeader).toContain("Add Employee");

        // Step 6: Validate Employee Name
        const empName = await pimPage.getEmployeeName();
        expect(empName).toContain(employee.firstName);

        console.log(`Employee created with ID: ${employee.empID}, Email: ${employee.email}`);
    });
});
