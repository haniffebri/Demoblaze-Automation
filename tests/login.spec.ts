import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import users from '../fixtures/login.fixture.json';

test.describe('Module: Login', () => {
  let login: Login;
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    login = new Login(page);

    await home.open();
    await home.openLogin();
  });

  test('TC-Login-001: Login with registered data', async () => {
    await login.inputDataLogin(users.valid1.username, users.valid1.password);
    await login.loginButton();
  });

  test('TC-Login-002: Login with unregistered data', async () => {
    await login.inputDataLogin('hayolohwakwaw', 'kemanasih');
    await login.loginButton();
    await login.verifyUserNotRegistered();
  });

  test('TC-Login-003: Login without fill username', async () => {
    await login.inputDataLogin('', users.valid1.password);
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-004: Login without fill password', async () => {
    await login.inputDataLogin(users.valid1.username, '');
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-005: Login without fill username and password', async () => {
    await login.inputDataLogin('', '');
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-006: Login with wrong username', async () => {
    await login.inputDataLogin('ngemabokyuk', users.valid1.password);
    await login.loginButton();
    await login.verifyUserNotRegistered();
  });

  test('TC-Login-007: Login with wrong password', async () => {
    await login.inputDataLogin(users.valid1.username, 'lukerensih');
    await login.loginButton();
    await login.verifyWrongData();
  });

  test('TC-Login-008: User can close dialog using X button', async () => {
    await login.closeXLogin();
  });

  test('TC-Login-009: User can close dialog using Close button', async () => {
    await login.closeButtonLogin();
  });
});