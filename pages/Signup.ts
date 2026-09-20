import { Page, Locator, expect, Dialog } from '@playwright/test';

export class Signup {
  readonly page: Page;
  readonly usernameFieldSignUp: Locator;
  readonly passwordFieldSignUp: Locator;
  readonly signUpXClose: Locator;
  readonly signUpCloseButton: Locator;
  readonly signUpTombol: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameFieldSignUp = page.getByRole('textbox', { name: 'Username:' })
    this.passwordFieldSignUp = page.getByLabel('Password:')
    this.signUpXClose = page.locator('button.close:visible')
    this.signUpCloseButton = page.locator('button.btn.btn-secondary:visible')
    this.signUpTombol = page.getByRole('button', { name: 'Sign up' })
  }

  async open() {
    await this.page.goto('/');
  }

  async inputUnregisteredDataSignUp(username?: string,password?: string): Promise<{ username: string; password: string }> {
    const random = (length: number, charset: string): string => Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');

    const finalUsername =username ??`user_${Date.now()}_${random(4, 'abcdefghijklmnopqrstuvwxyz0123456789')}`;
    const finalPassword = password ??random(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

    await this.usernameFieldSignUp.fill(finalUsername);
    await this.passwordFieldSignUp.fill(finalPassword);

    return { username: finalUsername, password: finalPassword };
  }

  async inputDataSignUp(username: string, password: string){
    await this.usernameFieldSignUp.fill(username);
    await this.passwordFieldSignUp.fill(password);
  }

  async closeXSignUp(){
    await this.signUpXClose.click();
  }

  async closeButtonSignUp(){
    await this.signUpCloseButton.click();
  }

  async signUpButton(){
    await this.signUpTombol.click();
  }
  
  async verifyLoginWithEmptyFields(): Promise<void> {
  const dialogPromise = this.page.waitForEvent('dialog');
  const clickPromise = this.signUpTombol.click();

  const dialog = await dialogPromise;

  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('Please fill out Username and Password.');

  await dialog.accept();
  await clickPromise;
  }

  async verifyUserRegistered(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const dialog = await dialogPromise;

    await expect(dialog.message()).toBe('This user already exist.');
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