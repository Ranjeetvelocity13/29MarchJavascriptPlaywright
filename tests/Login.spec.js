import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import envConfig from "../config/envConfig.js";

test("Valid user should login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage(envConfig.baseURL);
    await loginPage.login(envConfig.username, envConfig.password);

    const header = await dashboardPage.getHeadersTitle();
    expect(header).toContain("Dashboard");
});
