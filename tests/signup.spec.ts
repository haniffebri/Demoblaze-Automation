import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { Signup } from '../pages/Signup';
import users from '../fixtures/login.fixture.json';

test.describe('Module: Login', () => {
  let signup: Signup;
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    signup = new Signup(page);

    await home.open();
    await home.openSignUp();
  });

  test('TC-Login-001: Sign Up with unregistered data', async () => {
    await signup.inputUnregisteredDataSignUp();
    await signup.signUpButton();
  });

  test('TC-Login-002: Sign Up with registered data', async () => {
    await signup.inputDataSignUp('cuking', 'kucingcikung');
    await signup.signUpButton();
    await signup.verifyUserRegistered();
  });

  test('TC-Login-003: Sign Up with registered username and unregistered password', async () => {
  });

  test('TC-Login-004: Sign Up with unregistered username and registered password', async () => {
  });

  test('TC-Login-005: Signup without fill username and password', async () => {
  });

  test('TC-Login-006: Signup without fill username', async () => {
  });

  test('TC-Login-007: Signup without fill password', async () => {
  });

  test('TC-Login-008: User can close dialog using X button', async () => {
    await signup.closeXSignUp();
  });

  test('TC-Login-009: User can close dialog using Close button', async () => {
    await signup.closeButtonSignUp();
  });
});