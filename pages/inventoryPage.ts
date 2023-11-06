import { ElementHandle, expect, Locator, type Page } from "@playwright/test";
import dotenv from "dotenv";

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config();
    };

    async goto({ onlyCheck: onlyUrlCheck = false }: { onlyCheck?: boolean }) {
        if (process.env.BASE_URL && !onlyUrlCheck) {
            await this.page.goto(process.env.BASE_URL + "inventory.html");
        }
        expect(this.page.url()).toEqual(process.env.BASE_URL + "inventory.html");
        // check elements
        const logo = await this.getAppLogo();
        const burger = await this.getBurgerButton();
        const cart = await this.getCart();
        const sortContainer = await this.getSortContainer();
        expect(logo.isVisible, "Logo is not visible").toBeTruthy();
        expect(burger.isVisible, "Burger menu is not visible").toBeTruthy();
        expect(cart.isVisible, "Cart is not visible").toBeTruthy();
        expect(sortContainer.isVisible, "Sort container is not visible").toBeTruthy();
    };

    async getAppLogo() {
        return this.page.locator("div.app_logo");
    };

    async getBurgerButton() {
        return this.page.locator("div.bm-burger-button");
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

    async getInventoryLink() {
        return this.page.locator("#inventory_sidebar_link");
    };

    async getAboutLink() {
        return this.page.locator("#about_sidebar_link");
    };

    async getLogoutLink() {
        return this.page.locator("#logout_sidebar_link");
    };

    async getResetLink() {
        return this.page.locator("#reset_sidebar_link");
    };

    async getSortContainer() {
        return this.page.locator("[data-test='product_sort_container']");
    };

    async selectSortOption(option: string) {
        const sortContainer = await this.getSortContainer();
        await sortContainer.selectOption(option)
    };

    async getItemsNames() {
        return this.page.locator("div.inventory_item_name").all();
    }

    async getItemsPrices() {
        return this.page.locator("div.inventory_item_price").all();
    }

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

    async clickBurgerButton() {
        const burger = await this.getBurgerButton();
        await burger.click();
        // await burger.dispatchEvent('click');
    };

    async checkSidebar() {
        const inventory = await this.getInventoryLink();
        const about = await this.getAboutLink();
        const logout = await this.getLogoutLink();
        const reset = await this.getResetLink();
        // await inventory.waitFor({state: "visible"});
        expect(await inventory.isVisible()).toBeTruthy();
        expect(await about.isVisible()).toBeTruthy();
        expect(await logout.isVisible()).toBeTruthy();
        expect(await reset.isVisible()).toBeTruthy();
    };

    async checkSorting(type: string) {
        const names = await this.getItemsNames();
        const prices = await this.getItemsPrices();
        switch (type) {
            case "az":
                await this.checkSortingOrder(names, (name1, name2) => name1 <= name2, type);
                break;
            case "za":
                await this.checkSortingOrder(names, (name1, name2) => name1 >= name2, type);
                break;
            case "lohi":
                await this.checkSortingOrder(prices, (price1, price2) => Number(price1?.replace(/^\$/, "")) <= Number(price2?.replace(/^\$/, "")), type);
                break;
            case "hilo":
                await this.checkSortingOrder(prices, (price1, price2) => Number(price1?.replace(/^\$/, "")) >= Number(price2?.replace(/^\$/, "")), type);
                break;
            default:
                throw new Error("There is no sorting type like: " + type);
        }
    };

    private async checkSortingOrder(items: Locator[], comparator: (a: string, b: string) => boolean, sortingType: string) {
        for (let i = 0; i < items.length - 1; i++) {
            const item1 = await items[i].textContent();
            const item2 = await items[i + 1].textContent();
            if (item1 && item2) {
                const result = comparator(item1, item2);
                expect(result, `${sortingType} sorting is not working`).toBeTruthy();
            }
        }
    }

    async close() {
        await this.page.close();
    };
};