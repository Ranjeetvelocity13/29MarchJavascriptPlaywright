import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import envConfig from "../config/envConfig.js";

test.describe("Dashboard Widget Operations", () => {

    test("Click Quick Launch options after scrolling", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // Step 1: Login
        await loginPage.gotoLoginPage(envConfig.baseURL);
        await loginPage.login(envConfig.username, envConfig.password);

        // Step 2: Validate dashboard visible
        await expect(page.locator(dashboardPage.dashboardHeader)).toBeVisible();

        // Step 3: Assign Leave
        await dashboardPage.clickAssignLeave();
        await expect(page).toHaveURL(/assignLeave/);
        console.log(" Navigated to Assign Leave page");

        // Step 4: Back to Dashboard
        await page.goto(envConfig.baseURL);

        // Step 5: Leave List
        await dashboardPage.clickLeaveList();
        await expect(page).toHaveURL(/viewLeaveList/);
        console.log(" Navigated to Leave List page");

        // Step 6: Back to Dashboard
        await page.goto(envConfig.baseURL);

        // Step 7: Timesheets
        await dashboardPage.clickTimesheet();
        // await expect(page).toHaveURL(/timesheet/);
        console.log(" Navigated to Timesheets page");

        // Step 8: Back to Dashboard
        await page.goto(envConfig.baseURL);

        // Step 9: Apply Leave
        await dashboardPage.clickApplyLeave();
        // await expect(page).toHaveURL(/applyLeave/);
        console.log(" Navigated to Apply Leave page");
    });
});
