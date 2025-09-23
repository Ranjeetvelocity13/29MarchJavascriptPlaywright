import WaitHelper from "../utils/WaitHelper.js";
import Logger from "../utils/Logger.js";

export class BasePage {
    constructor(page) {
        this.page = page;
        this.waitHelper = new WaitHelper(page);
    }

    async click(selector, timeout = 10000) {
        await this.waitHelper.waitForVisible(selector, timeout);
        await this.page.click(selector);
        Logger.log(`Clicked on element: ${selector}`);
    }

    async type(selector, text, timeout = 10000) {
        if (typeof text !== "string") {
            Logger.error(`type() expected string but got: ${text}`);
            throw new Error(`type() expected string but got: ${text}`);
        }
        await this.waitHelper.waitForVisible(selector, timeout);
        await this.page.fill(selector, text);
        Logger.log(`Typed "${text}" into element: ${selector}`);
    }

    async getText(selector, timeout = 10000) {
        await this.waitHelper.waitForVisible(selector, timeout);
        const text = await this.page.textContent(selector);
        Logger.log(`Got text from ${selector}: "${text}"`);
        return text;
    }

    async isVisible(selector, timeout = 10000) {
        try {
            await this.waitHelper.waitForVisible(selector, timeout);
            Logger.log(`Element is visible: ${selector}`);
            return true;
        } catch {
            Logger.error(`Element not visible: ${selector}`);
            return false;
        }
    }

    async waitForUrlContains(expected, timeout = 10000) {
        await this.waitHelper.waitForUrlContains(expected, timeout);
        Logger.log(`URL contains: ${expected}`);
    }

    async waitForTitleContains(expected, timeout = 10000) {
        await this.waitHelper.waitForTitleContains(expected, timeout);
        Logger.log(`Page title contains: ${expected}`);
    }

    async waitForText(selector, expected, timeout = 10000) {
        await this.waitHelper.waitForText(selector, expected, timeout);
        Logger.log(`Element ${selector} contains text: "${expected}"`);
    }

    async sleep(ms) {
        await this.waitHelper.sleep(ms);
        Logger.log(`Waited for ${ms} ms`);
    }

    async takeScreenshot(fileName) {
        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true,
        });
        Logger.log(`Screenshot captured: screenshots/${fileName}.png`);
    }
}
