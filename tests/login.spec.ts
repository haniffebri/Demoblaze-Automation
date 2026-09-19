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

  test('TC-Login-001: Login with valid credentials', async () => {
    await home.openLogin();

    await login.inputDataLogin(users.valid1.username, users.valid1.password);
    await login.loginButton();
  });
});