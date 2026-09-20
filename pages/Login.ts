import { Page, Locator, expect, Dialog } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly usernameFieldLogin: Locator;
  readonly passwordFieldLogin: Locator;
  readonly loginXClose: Locator;
  readonly loginCloseButton: Locator;
  readonly loginTombol: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameFieldLogin = page.locator('#loginusername')
    this.passwordFieldLogin = page.locator('#loginpassword')
    this.loginXClose = page.locator('button.close:visible')
    this.loginCloseButton = page.locator('button.btn.btn-secondary:visible')
    this.loginTombol = page.getByRole('button', { name: 'Log in' })
  }

  async open() {
    await this.page.goto('/');
  }

  async inputDataLogin(username: string, password: string){
    await this.usernameFieldLogin.fill(username);
    await this.passwordFieldLogin.fill(password);
  }

  async closeXLogin(){
    await this.loginXClose.click();
  }

  async closeButtonLogin(){
    await this.loginCloseButton.click();
  }

  async loginButton(){
    await this.loginTombol.click();
  }
  
  async verifyLoginWithEmptyFields(): Promise<void> {
  const dialogPromise = this.page.waitForEvent('dialog');
  const clickPromise = this.loginTombol.click();

  const dialog = await dialogPromise;

  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('Please fill out Username and Password.');

  await dialog.accept();
  await clickPromise;
  }

  async verifyUserNotRegistered(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const dialog = await dialogPromise;

    await expect(dialog.message()).toBe('User does not exist.');
    await expect(dialog.type()).toBe('alert');

    await dialog.accept();
  }

  async verifyWrongData(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const dialog = await dialogPromise;

    await expect(dialog.message()).toBe('Wrong password.');
    await expect(dialog.type()).toBe('alert');

    await dialog.accept();
  }

}