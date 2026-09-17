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
  readonly logout: Locator;
  readonly welcomeUser: Locator;
  readonly firstSlideSamsung: Locator;
  readonly secondSlideNexus: Locator;
  readonly thirdSlideIphone: Locator;
  readonly nextSlide: Locator;
  readonly previousSlide: Locator;
  readonly phonesCategories: Locator;
  readonly laptopsCategories: Locator;
  readonly monitorsCategories: Locator;
  readonly product: Locator;
  readonly productDetail: Locator;
  readonly productS6: Locator;
  readonly productI5: Locator;
  readonly product24: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbarBrand = page.getByRole('link', {name: 'PRODUCT STORE',});
    this.home = page.getByRole('link', {name: 'Home',});
    this.contact = page.getByRole('link', {name: 'Contact',});
    this.aboutus = page.getByRole('link', {name: 'About us',});
    this.cart = page.getByRole('link', {name: 'Cart',});
    this.login = page.getByRole('link', {name: 'Login',});
    this.signup = page.getByRole('link', {name: 'Sign up',});
    this.logout = page.getByRole('link', { name: 'Log out' })
    this.welcomeUser = page.locator("#nameofuser")
    this.firstSlideSamsung = page.getByRole('img', { name: 'First slide' });
    this.secondSlideNexus = page.getByRole('img', { name: 'Second slide' });
    this.thirdSlideIphone = page.getByRole('img', { name: 'Third slide' });
    this.previousSlide = page.locator('span.carousel-control-prev-icon')
    this.nextSlide = page.locator('span.carousel-control-next-icon')
    this.phonesCategories = page.getByRole('link', { name: 'Phones' })
    this.laptopsCategories = page.getByRole('link', { name: 'Laptops' })
    this.monitorsCategories = page.getByRole('link', { name: 'Monitors' })
    this.product = page.locator('card-title');
    this.productDetail = page.locator('card-title');
    this.productS6 = page.getByRole('link', { name: 'Samsung galaxy s6' })
    this.productI5 = page.getByRole('link', { name: 'Sony vaio i5' })
    this.product24 = page.getByRole('link', { name: 'Apple monitor 24' })
    this.footer = page.locator('#footc');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openHome(){
    await this.home.click();
  }

  async openContact(){
    await this.contact.click();
  }

  async openAboutus(){
    await this.aboutus.click();
  }

  async openCart(){
    await this.cart.click();
  }

  async openLogin(){
    await this.login.click();
  }

  async openSignup(){
    await this.signup.click();
  }

  async checkProduct(product: string): Promise<void> {
  await expect(this.page.getByText(product, { exact: true })).toBeVisible();
  }

  async openProductDetail(product: string){
    return this.page.getByRole('link', { name: product }).click();

  }

  async categoriesPhones(){
    await this.phonesCategories.click();
    await expect(this.productS6).toBeVisible();
  }

  async categoriesLaptops(){
    await this.laptopsCategories.click();
    await expect(this.productI5).toBeVisible();
  }

  async categoriesMonitors(){
    await this.monitorsCategories.click();
    await expect(this.product24).toBeVisible();
  }
}