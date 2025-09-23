export default class WaitHelper {
    constructor(page) {
        this.page = page;
    }

    async waitForVisible(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { state: "visible", timeout });
    }

    async waitForHidden(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { state: "hidden", timeout });
    }

    async waitForAttached(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { state: "attached", timeout });
    }

    async waitForDetached(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { state: "detached", timeout });
    }

    async waitForText(selector, expectedText, timeout = 10000) {
        await this.page.waitForFunction(
            (sel, text) => {
                const el = document.querySelector(sel);
                return el && el.innerText.includes(text);
            },
            selector,
            expectedText,
            { timeout }
        );
    }

    async waitForUrlContains(expected, timeout = 10000) {
        await this.page.waitForFunction(
            (expected) => window.location.href.includes(expected),
            expected,
            { timeout }
        );
    }

    async waitForTitleContains(expected, timeout = 10000) {
        await this.page.waitForFunction(
            (expected) => document.title.includes(expected),
            expected,
            { timeout }
        );
    }

    async sleep(ms) {
        await this.page.waitForTimeout(ms);
    }
}
