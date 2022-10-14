import { expect, Locator, Page } from '@playwright/test';
import { Helpers } from '../helpers/helpers';

export class Pool {

  readonly helpers: Helpers;
  readonly page: Page;
  readonly cell: Locator;
  readonly date: string;
  readonly time: string

  constructor(page: Page) {
    this.helpers = new Helpers();
    this.page = page;
    this.date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    this.time = `${new Date().getHours() + 1}:00`;
    this.cell = page.locator(`//*[@id="schedule"]/tbody/tr[contains(td, "${this.time}")]/td[@class="day-highlight"]/div[contains(@data-link, "${this.date}")]`);
  }

  async goto() {
    await this.page.goto('https://www.spa.wroc.pl/basen-1-638');
  }

  async screenshot(path: string) {
    expect(await this.page.screenshot({ path: './screenshots/' + path })).toMatchSnapshot();
  }

  async cellScreenshot(path: string) {
    await this.cell.screenshot({ path: './screenshots/' + path });
  }

  async getFreePlaces() {
    if (await this.cell.count() == 1) {
      let x = this.helpers.extract(await this.cell.locator('div.list-entry-info').textContent(), /.*\:\s(\d+).*/)
      console.log(x ? x[1] : null);
      return x ? x[1] : 0;
    } else {
      console.log("Pool is not working");
      return 0;
    }
  }

  async logPlaces() {
    this.helpers.writePlaces(`../logs/${this.date}.csv`, this.time + ", " + await this.getFreePlaces() + "\n");
  }
}