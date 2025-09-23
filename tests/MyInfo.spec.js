import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { MyInfoPage } from "../pages/MyInfoPage.js";
import envConfig from "../config/envConfig.js";
import Logger from "../utils/Logger.js";

test.describe("OrangeHRM My Info Tests", () => {
    test("Update employee personal info", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const myInfoPage = new MyInfoPage(page);

        // Step 1: Login
        Logger.log("Navigating to login page...");
        await loginPage.gotoLoginPage(envConfig.baseURL);
        await loginPage.login(envConfig.username, envConfig.password);

        // Step 2: Verify Dashboard is loaded
        const header = await dashboardPage.getHeadersTitle();
        expect(header).toContain("Dashboard");
        Logger.log("Dashboard visible ✅");

        // Step 3: Navigate to My Info
        Logger.log("Navigating to My Info...");
        await myInfoPage.navigateToMyInfo();

        // Step 4: Update Name
        const firstName = "Ranjeet";
        const lastName = "Kendre";
        Logger.log(`Updating name: ${firstName} ${lastName}`);
        await myInfoPage.updateName(firstName, lastName);

        // Step 5: Validate Updated Name
        const updatedName = await myInfoPage.getEmployeeName();
        Logger.log(`Name updated successfully: ${updatedName}`);
    });
});
