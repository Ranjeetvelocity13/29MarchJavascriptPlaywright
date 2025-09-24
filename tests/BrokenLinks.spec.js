import { test } from "@playwright/test";
import envConfig from "../config/envConfig.js";

test.setTimeout(120000);

test("Check all links on OrangeHRM Login Page", async ({ page }) => {
    // Step 1: Navigate
    await page.goto(envConfig.baseURL);

    // Step 2: Wait for at least 1 <a> to appear
    await page.waitForSelector("a[href]", { timeout: 10000 });

    // Step 3: Collect all links
    const links = await page.$$eval("a[href]", (as) => as.map((a) => ({
        text: a.innerText.trim(),
        href: a.href
    })));
    console.log(`🔗 Total links found on Login Page: ${links.length}`);

    let brokenLinks = 0;

    // Step 4: Validate each link
    for (const link of links) {
        if (!link.href || link.href.trim() === "" || link.href.startsWith("javascript")) continue;

        try {
            const response = await page.request.get(link.href, { timeout: 30000 });
            const status = response.status();

            if (status >= 400) {
                console.log(` ${status} BROKEN → [${link.text}] ${link.href}`);
                brokenLinks++;
            } else {
                console.log(` ${status} VALID → [${link.text}] ${link.href}`);
            }
        } catch (err) {
            console.log(` Error loading [${link.text}] ${link.href} → ${err.message}`);
            brokenLinks++;
        }
    }

    console.log(`\n Total number of broken links on Login Page: ${brokenLinks}`);
});
