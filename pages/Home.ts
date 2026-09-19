import { Page, Locator, expect } from '@playwright/test';

export class Home {
  readonly page: Page;
  readonly navbarBrand: Locator;
  readonly home: Locator;
  readonly contact: Locator;
  readonly contactDialog: Locator;
  readonly contactClose: Locator;
  readonly aboutus: Locator;
  readonly aboutUsDialog: Locator;
  readonly aboutUsClose: Locator;
  readonly cart: Locator;
  readonly login: Locator;
  readonly loginDialog: Locator;
  readonly loginClose: Locator;
  readonly signUp: Locator;
  readonly signUpDialog: Locator;
  readonly closeSignUp: Locator;
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
    this.contactDialog = page.locator('div.modal-content:visible')
    this.contactClose = page.getByRole('button', { name: 'Close' }).first()
    this.aboutus = page.getByRole('link', {name: 'About us',});
    this.aboutUsDialog = page.locator('div.modal-content:visible')
    this.aboutUsClose = page.locator('span').filter({ hasText: '×' }).first()
    this.cart = page.getByRole('link', {name: 'Cart',});
    this.login = page.locator('li:has-text("Log in")')
    this.loginDialog = page.locator("//div[@id='logInModal']//div[@class='modal-content']")
    this.loginClose = page.getByText('×')
    this.signUp = page.getByRole('link', {name: 'Sign up',});
    this.signUpDialog = page.getByRole('link', {name: 'Sign up',});
    this.closeSignUp = page.getByText('×')
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

  async open() {
    await this.page.goto('/');
  }

  async openHome(){
    await this.home.click();
  }

  async openContact(){
    await this.contact.click();
    await expect(this.contactDialog).toBeVisible();
  }

  async closeContact(){
    await this.contactClose.click();
  }

  async openAboutus(){
    await this.aboutus.click();
    await expect(this.aboutUsDialog).toBeVisible();
  }

  async closeAboutus(){
    await this.aboutus.click();
  }

  async openCart(){
    await this.cart.click();
    await this.page.goto('/cart.html');
  }

  async openLogin(){
    await this.login.click();
    await expect(this.loginDialog).toBeVisible();
  }

  async closeLogin(){
    await this.loginClose.click();
  }

  async openSignUp(){
    await this.signUp.click();
    await expect(this.signUpDialog).toBeVisible();
  }

  async closeSignUpDialog(){
    await this.closeSignUp.click();
  }

  async checkProduct(product: string): Promise<void> {
  await expect(this.page.getByText(product, { exact: true })).toBeVisible();
  }

  async openProductDetail(product: string){
    await this.page.getByRole('link', { name: product }).click();
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