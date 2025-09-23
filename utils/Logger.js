import { allure } from "allure-playwright";

export default class Logger {
    static log(message) {
        const timestamp = new Date().toISOString();
        console.log(`[LOG] [${timestamp}] ${message}`);
        allure.step(message, async () => { }); // log step in Allure
    }

    static error(message) {
        const timestamp = new Date().toISOString();
        console.error(`[ERROR] [${timestamp}] ${message}`);
        allure.step(`ERROR: ${message}`, async () => { });
    }
}
