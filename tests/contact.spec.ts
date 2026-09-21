import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import users from '../fixtures/login.fixture.json';
import { Contact } from '../pages/Contact';

test.describe('Module: Contact', () => {
  let contact: Contact;
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    contact = new Contact(page);

    await home.open();
    await home.openContact();
  });

  test('TC-Contact-001: Send message with all fields filled (email format) (Guest)', async () => {
    await contact.inputAllFieldContact({email: 'kucingongklok@gmail.com',name:  'kucing',message:  'aku mau mie ongklok'});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-002: Send message with all fields filled (email without format) (Guest)', async () => {
    await contact.inputAllFieldContact({name:  'kucing',message:  'aku mau mie ongklok', length: 10});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-003: Send message with 10 characters in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 10});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-004: Send message with 100 characters in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 100});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-005: Send message with 1000 characters in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 1000});
    await contact.verifySendMessageSuccess(); 
  });

  test('TC-Contact-006: Send message with 10 characters and 10 numbers in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 10, withNumber: true});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-007: Send message with 100 characters and 100 numbers in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 100, withNumber: true});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-008: Send message with 1000 characters and 1000 numbers in every field (Guest)', async () => {
    await contact.inputAllFieldContact({length: 1000, withNumber: true});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-009: Send message with all fields empty (Guest)', async () => {
    await contact.inputAllFieldContact({email:'', name: '', message: ''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-010: Send message without fill contact email (Guest)', async () => {
    await contact.inputAllFieldContact({email:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-011: Send message without fill contact name (Guest)', async () => {
    await contact.inputAllFieldContact({name:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-012: Send message without fill message (Guest)', async () => {
    await contact.inputAllFieldContact({message:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-012: Send message only fill contact email (Guest)', async () => {
    await contact.inputAllFieldContact({name: '', message:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-012: Send message only fill contact name (Guest)', async () => {
    await contact.inputAllFieldContact({email: '', message:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-013: Send message only fill message (Guest)', async () => {
    await contact.inputAllFieldContact({email: '', name:''});
    await contact.verifySendMessageSuccess();
  });

  test('TC-Contact-014: User can close dialog using X button (Guest)', async () => {
    await contact.closeXContact();
  });

  test('TC-Contact-015: User can close dialog using Close button (Guest)', async () => {
    await contact.closeButtonContact();
  });
});