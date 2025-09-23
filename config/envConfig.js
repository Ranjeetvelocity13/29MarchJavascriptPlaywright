const configs = {
    prod: {
        envName: "PROD",
        baseURL: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        username: "Admin",
        password: "admin123"
    },
    qa: {
        envName: "QA",
        baseURL: "https://qa.orangehrm.com/web/index.php/auth/login",
        username: "qaAdmin",
        password: "qaPass123"
    },
    staging: {
        envName: "STAGING",
        baseURL: "https://staging.orangehrm.com/web/index.php/auth/login",
        username: "stageAdmin",
        password: "stagePass123"
    }
};

// Pick env from system variable, default = prod
const env = process.env.TEST_ENV || "prod";
export default configs[env];
