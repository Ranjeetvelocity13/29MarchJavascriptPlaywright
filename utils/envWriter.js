import fs from "fs";
import envConfig from "../config/envConfig.js";  // ✅ import your single envConfig

export function writeAllureEnv() {
    const content = [
        `Environment=${envConfig.envName}`,
        `BaseURL=${envConfig.baseURL}`,
        `Browser=Chromium`,
        `OS=${process.platform}`,
        `Executor=Playwright`
    ].join("\n");

    // Ensure folder exists
    if (!fs.existsSync("allure-results")) {
        fs.mkdirSync("allure-results");
    }

    fs.writeFileSync("allure-results/environment.properties", content);
    console.log("✅ Allure environment.properties file created");
}
