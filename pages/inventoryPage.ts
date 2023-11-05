import { expect, type Page } from "@playwright/test";
import dotenv from "dotenv";

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
    };

    async goto({ onlyUrlCheck = false }: { onlyUrlCheck?: boolean }) {
        if (process.env.BASE_URL && !onlyUrlCheck) {
            await this.page.goto(process.env.BASE_URL + "inventory.html");
        }
        expect(this.page.url()).toEqual(process.env.BASE_URL + "inventory.html");
    };

    async getAppLogo() {
        return this.page.locator("div.app_logo");
    };

    async getBurgerButton() {
        return this.page.locator("button#ireact-burger-menu-btn");
    };

    async getCart() {
        return this.page.locator("a.shopping_cart_link");
    };

    async getInventoryItems() {
        return this.page.locator("div.inventory_item").all();
    };

    async getAddToCartButtons() {
        return this.page.locator("button[data-test^='add-to-cart']").all();
    };

    async getCartCount() {
        return this.page.locator("span.shopping_cart_badge").textContent();
    };

    async clickAddToCartButton() {
        const addToCartBtns = await this.getAddToCartButtons();
        for (let i = 0; i < addToCartBtns.length; i++) {
            addToCartBtns[0].dispatchEvent('click');
            expect((i + 1).toString(), "Count of the checked good and cart's bage count a different").toEqual(await this.getCartCount());
        };
        return addToCartBtns.length;
    };

    async gotoCart() {
        const cart = await this.getCart();
        await cart.click();
    };

    async close() {
        await this.page.close();
    };
};