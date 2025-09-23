import { test } from "@playwright/test";
import { allure } from "allure-playwright";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        // Failure screenshot
        const screenshot = await page.screenshot();
        allure.attachment("Failure Screenshot", screenshot, "image/png");
    } else {
        // Success screenshot (optional)
        const screenshot = await page.screenshot();
        allure.attachment("Success Screenshot", screenshot, "image/png");
    }
});
