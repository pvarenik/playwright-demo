import { expect, type Page } from "@playwright/test";
import dotenv from "dotenv";
import { getRandomString } from "../helpers/helpers";

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
    };

    async goto({ onlyCheck: onlyUrlCheck = false }: { onlyCheck?: boolean }) {
        if (process.env.BASE_URL && !onlyUrlCheck) {
            await this.page.goto(process.env.BASE_URL + "checkout-step-one.html");
        }
        expect(this.page.url()).toContain(process.env.BASE_URL + "checkout");
    };

    private async getFirstnameField() {
        return this.page.locator("[data-test='firstName']");
    };

    private async getLastnameField() {
        return this.page.locator("[data-test='lastName']");
    };

    private async getPostalField() {
        return this.page.locator("[data-test='postalCode']");
    };

    private async getContinueButton() {
        return this.page.locator("[data-test='continue']");
    };

    private async getCancelButton() {
        return this.page.locator("[data-test='cancel']");
    };

    private async getFinishButton() {
        return this.page.locator("[data-test='finish']");
    };

    private async getBackHomeButton() {
        return this.page.locator("[data-test='back-to-products']");
    };

    async clickFinishButton() {
        const finishButton = await this.getFinishButton();
        await finishButton.click();
    };

    async clickBackHomeButton() {
        const backHomeButton = await this.getBackHomeButton();
        await backHomeButton.click();
    };

    async fillFieldsRandomly() {
        const firstnameField = await this.getFirstnameField();
        const lastnameField = await this.getLastnameField();
        const postalField = await this.getPostalField();
        const continueButton = await this.getContinueButton();
        await firstnameField.fill(getRandomString());
        await lastnameField.fill(getRandomString());
        await postalField.fill(getRandomString());
        await continueButton.click();
    };

    async close() {
        await this.page.close();
    };
};