import { expect, type Page } from "@playwright/test";
import dotenv from "dotenv";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
    }

    async goto() {
        if (process.env.BASE_URL) {
            await this.page.goto(process.env.BASE_URL);
        }
        expect(this.page.url()).toEqual(process.env.BASE_URL)
    }

    async getUsernameInput() {
        return this.page.locator("#user-name");
    }

    async getPasswordInput() {
        return this.page.locator("#password");
    }

    async getLoginButton() {
        return this.page.locator("#login-button");
    }

    async getLockingErrorField() {
        return this.page.locator("h3[data-test='error']");
    }
    
    async typeUsername(username: string) {
        const usernameInput = await this.getUsernameInput();
        expect(usernameInput, "There is no user name field").not.toBeNull;
        await usernameInput.fill(username);
    }

    async loginStandardUser() {
        if (process.env.STANDARD_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.STANDARD_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("inventory.html")
        } else {
            throw ("STANDARD_USER is not difined.");
        };
    }

    async loginLockedUser() {
        if (process.env.LOCKED_OUT_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.LOCKED_OUT_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("")
            const lockingErrorField = await this.getLockingErrorField();
            expect(lockingErrorField, "There is no locking error field").not.toBeNull;
        } else {
            throw ("LOCKED_OUT_USER is not difined.");
        };
    }

    async loginProblemdUser() {
        if (process.env.PROBLEM_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.PROBLEM_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("inventory.html")
        } else {
            throw ("PROBLEM_USER is not difined.");
        };
    }

    async loginPerformanceUser() {
        if (process.env.PERFORMANCE_GLITCH_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.PERFORMANCE_GLITCH_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("inventory.html")
        } else {
            throw ("PERFORMANCE_GLITCH_USER is not difined.");
        };
    }

    async loginErrordUser() {
        if (process.env.ERROR_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.ERROR_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("inventory.html")
        } else {
            throw ("ERROR_USER is not difined.");
        };
    }

    async loginVisualUser() {
        if (process.env.VISUAL_USER && process.env.SECRET_SAUCE) {
            await this.typeUsername(process.env.VISUAL_USER);
            await this.typePassword(process.env.SECRET_SAUCE);
            await this.clickLoginButton("inventory.html")
        } else {
            throw ("VISUAL_USER is not difined.");
        };
    }

    async typePassword(password: string) {
        const passwordInput = await this.getPasswordInput();
        expect(passwordInput, "There is no user password field").not.toBeNull;
        await passwordInput.fill(password);
    }

    async clickLoginButton(path: string) {
        const loginButton = await this.getLoginButton();
        expect(loginButton, "There is no login button").not.toBeNull;
        await loginButton.click();
        expect(this.page.url()).toEqual(process.env.BASE_URL + path)
    }

    async close() {
        await this.page.close();
    }
}