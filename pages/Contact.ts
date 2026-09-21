import { Page, Locator, expect, Dialog } from '@playwright/test';

export class Contact {
  readonly page: Page;
  readonly emailFieldContact: Locator;
  readonly nameFieldContact: Locator;
  readonly messageFieldContact: Locator;
  readonly sendMessageButton: Locator;
  readonly contactXClose: Locator;
  readonly contactCloseButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.emailFieldContact = page.locator('#recipient-email')
    this.nameFieldContact = page.locator('#recipient-name')
    this.messageFieldContact = page.locator('#message-text')
    this.sendMessageButton = page.locator('button:has-text("Send message")')
    this.contactXClose = page.locator('button.close:visible')
    this.contactCloseButton = page.locator('button.btn.btn-secondary:visible')
  }

  async open() {
    await this.page.goto('/');
  }

  async inputAllFieldContact(
  options: {
    email?: string;
    name?: string;
    message?: string;
    length?: number;
    withNumber?: boolean;
    emailFormat?: boolean;
  } = {}
): Promise<{ email: string; name: string; message: string }> {
  const {
    email,
    name,
    message,
    length = 10,
    withNumber = false,
    emailFormat = false,
  } = options;

  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  const DIGITS = '0123456789';

  // ambil `len` karakter acak dari kumpulan karakter tertentu
  const pick = (len: number, charset: string): string =>
    Array.from({ length: len }, () =>
      charset[Math.floor(Math.random() * charset.length)]
    ).join('');

  const randomString = (len: number) => pick(len, LETTERS); // contoh: fajanwfawf
  const randomInt = (len: number) => pick(len, DIGITS);     // contoh: 242135315

  // huruf saja, atau huruf lalu angka dengan panjang sama
  const randomText = () =>
    withNumber
      ? randomString(length) + randomInt(length)
      : randomString(length);

  // emailFormat: teks acak + @ + domain acak, contoh: fajanwfawf@qwert.com
  const randomEmail = () =>
    emailFormat
      ? `${randomText()}@${randomString(5)}.com`
      : randomText();

  // `??` hanya menggantikan null/undefined, jadi '' tetap dianggap input kosong
  const finalEmail = email ?? randomEmail();
  const finalName = name ?? randomText();
  const finalMessage = message ?? randomText();

  await this.emailFieldContact.fill(finalEmail);
  await this.nameFieldContact.fill(finalName);
  await this.messageFieldContact.fill(finalMessage);

  return { email: finalEmail, name: finalName, message: finalMessage };
}

  async sendMessage(){
    await this.sendMessageButton.click();
  }

  async closeXContact(){
    await this.contactXClose.click();
  }

  async closeButtonContact(){
    await this.contactCloseButton.click();
  }

  async verifySendMessageSuccess(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = this.sendMessageButton.click();

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Thanks for the message!!');

    await dialog.accept();
    await clickPromise;
   }
  }