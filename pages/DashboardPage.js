import { BasePage } from "./BasePage.js";

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = '//h6[text()="Dashboard"]';
        this.userDropdown = "span.oxd-userdropdown-tab";
        this.logoutLink = "a[href='/web/index.php/auth/logout']";
        this.dashboardHeader = '//h6[text()="Dashboard"]';
        this.quickLaunchWidget = '//p[text()="Quick Launch"]';
        this.assignLeaveOption = '//button[contains(@title,"Assign Leave")]';
        this.leaveListOption = '//button[contains(@title,"Leave List")]';
        this.timesheetOption = '//button[contains(@title,"Timesheets")]';
        this.applyLeaveOption = '//button[contains(@title,"Apply Leave")]';
        this.bottomWidget = '(//div[contains(@class,"orangehrm-dashboard-widget-body")])[last()]';
    }

    async getHeadersTitle() {
        return await this.getText(this.header);
    }

    async logout() {
        await this.click(this.userDropdown);
        await this.click(this.logoutLink);
    }

    async isDashboardVisible() {
        return await this.page.locator(this.dashboardHeader).isVisible();
    }

    //  Scrolling
    async scrollToQuickLaunch() {
        await this.scrollToElement(this.quickLaunchWidget);
    }

    async scrollToBottomWidget() {
        await this.scrollToElement(this.bottomWidget);
    }

    async scrollWholePage() {
        await this.scrollToBottom();
        await this.scrollToTop();
    }

    // Operations on Quick Launch options
    async clickAssignLeave() {
        await this.scrollToQuickLaunch();
        await this.click(this.assignLeaveOption);
    }

    async clickLeaveList() {
        await this.scrollToQuickLaunch();
        await this.click(this.leaveListOption);
    }

    async clickTimesheet() {
        await this.scrollToQuickLaunch();
        await this.click(this.timesheetOption);
    }

    async clickApplyLeave() {
        await this.scrollToQuickLaunch();
        await this.click(this.applyLeaveOption);
    }
}
