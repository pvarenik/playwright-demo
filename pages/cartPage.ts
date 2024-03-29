import { expect, type Page } from "@playwright/test";
import dotenv from "dotenv";

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
    };

    async goto({ onlyUrlCheck = false }: { onlyUrlCheck?: boolean }) {
        if (process.env.BASE_URL && !onlyUrlCheck) {
            await this.page.goto(process.env.BASE_URL + "cart.html");
        }
        expect(this.page.url()).toEqual(process.env.BASE_URL + "cart.html");
        const items = await this.getItems();
        const checkout = await this.getCheckotButton();
        const continueButton = await this.getContinueButton();
        expect(items[0].isVisible()).toBeTruthy();
        expect(checkout.isVisible()).toBeTruthy();
        expect(continueButton.isVisible()).toBeTruthy();
    };

    private async getItems() {
        return this.page.locator("div.cart_item").all();
    };

    private async getCheckotButton() {
        return this.page.locator("[data-test='checkout']");
    };

    private async getContinueButton() {
        return this.page.locator("[data-test='continue-shopping']");
    };

    async checkItemsCount(expected: number) {
        const items = await this.getItems();
        expect(expected).toEqual(items.length)
    };

    async clickCheckoutButton() {
        const checkoutBtn = await this.getCheckotButton();
        await checkoutBtn.click();
    };

    async clickContinueButton() {
        const continueBtn = await this.getContinueButton();
        await continueBtn.click();
    };    
    
    async close() {
        await this.page.close();
    };
};