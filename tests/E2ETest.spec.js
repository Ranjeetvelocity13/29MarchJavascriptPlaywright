import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { PIMPage } from "../pages/PIMPage.js";
import { MyInfoPage } from "../pages/MyInfoPage.js";
import envConfig from "../config/envConfig.js";
import DataHelper from "../utils/DataHelper.js";


test("E2E: Dashboard → PIM → My Info", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PIMPage(page);
    const myInfoPage = new MyInfoPage(page);

    // Step 1: Login
    await loginPage.gotoLoginPage(envConfig.baseURL);
    await loginPage.login(envConfig.username, envConfig.password);

    // Step 2: Validate Dashboard
    await expect(page.locator('//h6[text()="Dashboard"]')).toBeVisible();
    console.log("✅ Dashboard visible");

    // Step 3: Generate dynamic employee
    const employee = DataHelper.generateEmployee();
    console.log("Generated employee:", employee);

    // Step 4: Add Employee
    await pimPage.gotoPIM();
    await pimPage.addEmployee(employee);

    // Step 5: Navigate to My Info
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updateName("Updated", "Name"); // you can reuse employee if needed

    // Step 6: Validate
    const empName = await myInfoPage.getEmployeeName();
    expect(empName).toContain("PIM");

    //Step : 
});
