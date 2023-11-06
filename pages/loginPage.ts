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
        expect(this.page.url()).toEqual(process.env.BASE_URL);
        const username = await this.getUsernameInput();
        const password = await this.getPasswordInput();
        const loginButton = await this.getLoginButton();
        expect(username.isVisible(), "Username field is not visible").toBeTruthy();
        expect(password.isVisible(), "Password field is not visible").toBeTruthy();
        expect(loginButton.isVisible(), "Login button is not visible").toBeTruthy();        
    }

    private async getUsernameInput() {
        return this.page.locator("#user-name");
    }

    private async getPasswordInput() {
        return this.page.locator("#password");
    }

    private async getLoginButton() {
        return this.page.locator("#login-button");
    }

    private async getLockingErrorField() {
        return this.page.locator("h3[data-test='error']");
    }

    async typeUsername(username: string) {
        const usernameInput = await this.getUsernameInput();
        expect(usernameInput, "There is no username field").not.toBeNull;
        await usernameInput.fill(username);
    }

    async typePassword(password: string) {
        const passwordInput = await this.getPasswordInput();
        expect(passwordInput, "There is no password field").not.toBeNull;
        await passwordInput.fill(password);
    }

    async clickLoginButton(path: string) {
        const loginButton = await this.getLoginButton();
        expect(loginButton, "There is no login button").not.toBeNull;
        await loginButton.click();
        expect(this.page.url()).toEqual(process.env.BASE_URL + path);
    }

    async login(userType: string, shoulNotLogin = false) {
        const envVar = process.env[`${userType.toUpperCase()}_USER`];
        if (!envVar || !process.env.SECRET_SAUCE) {
            throw new Error(`${userType.toUpperCase()}_USER is not defined.`);
        }
        await this.typeUsername(envVar);
        await this.typePassword(process.env.SECRET_SAUCE);
        if (shoulNotLogin) {
            await this.clickLoginButton("");
        } else {
            await this.clickLoginButton("inventory.html");
        };
    }

    async close() {
        await this.page.close();
    }
}