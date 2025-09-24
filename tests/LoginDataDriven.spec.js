import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import envConfig from "../config/envConfig.js";

// Import login test data
import loginData from "../testdata/LoginData.json" assert { type: "json" };

test.describe("Login Tests - Data Driven", () => {
    for (const data of loginData) {
        test(`Login with username: ${data.username} and password: ${data.password}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            // Step 1: Navigate to login page
            await loginPage.gotoLoginPage(envConfig.baseURL);

            // Step 2: Enter credentials
            await loginPage.login(data.username, data.password);

            // Step 3: Validate outcome
            if (data.expected === "Dashboard") {
                await expect(page.locator(loginPage.dashboardHeader)).toBeVisible();
                console.log(`Login success validated for ${data.username}`);
            } else {
                const errorMsg = await loginPage.getErrorMessage();
                expect(errorMsg).toContain(data.expected);
                console.log(`Login failed as expected for ${data.username}`);
            }
        });
    }
});
