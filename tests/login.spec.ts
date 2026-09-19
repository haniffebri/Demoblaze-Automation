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
  });

  test('TC-Login-001: Login with registered data', async () => {
    await home.openLogin();

    await login.inputDataLogin(users.valid1.username, users.valid1.password);
    await login.loginButton();
  });

  test('TC-Login-002: Login with unregistered data', async () => {
    await home.openLogin();

    await login.inputDataLogin('hayolohwakwaw', 'kemanasih');
    await login.loginButton();
    await login.verifyUserNotRegistered();
  });

  test('TC-Login-003: Login without fill username', async () => {
    await home.openLogin();

    await login.inputDataLogin('', users.valid1.password);
    await login.loginButton();
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-004: Login without fill password', async () => {
    await home.openLogin();

    await login.inputDataLogin(users.valid1.username, '');
    await login.loginButton();
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-005: Login without fill username and password', async () => {
    await home.openLogin();

    await login.inputDataLogin('', '');
    await login.loginButton();
    await login.verifyLoginWithEmptyFields();
  });

  test('TC-Login-006: Login with wrong username', async () => {
    await home.openLogin();

    await login.inputDataLogin('ngemabokyuk', users.valid1.password);
    await login.loginButton();
    await login.verifyUserNotRegistered();
  });

  test('TC-Login-007: Login with wrong password', async () => {
    await home.openLogin();

    await login.inputDataLogin(users.valid1.username, 'lukerensih');
    await login.loginButton();
    await login.verifyWrongData();
  });
});