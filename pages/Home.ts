import { Page, Locator, expect } from '@playwright/test';

export class Home {
  readonly page: Page;
  readonly navbarBrand: Locator;
  readonly home: Locator;
  readonly contact: Locator;
  readonly aboutus: Locator;
  readonly cart: Locator;
  readonly login: Locator;
  readonly signup: Locator;
  readonly banner: Locator;
  readonly categories: Locator;
  readonly product: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbarBrand = page.locator('#user-name');
    this.home = page.locator('#password');
    this.contact = page.locator('#login-button');
    this.aboutus = page.locator('[data-test="error"]');
    this.navbarBrand = page.locator('#user-name');
    this.cart = page.locator('#password');
    this.login = page.locator('#login-button');
    this.signup = page.locator('[data-test="error"]');
    this.navbarBrand = page.locator('#user-name');
    this.banner = page.locator('#password');
    this.categories = page.locator('#login-button');
    this.product = page.locator('[data-test="error"]');
    this.footer = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }
}