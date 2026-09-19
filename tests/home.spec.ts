import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { ProductPage } from '../pages/ProductPage';

test.describe('Home', () => {

  test('user can view product detail', async ({ page }) => {
    const home = new Home(page);
    const productPage = new ProductPage(page);

    await home.open();
    await homePage.expectHomePageDisplayed();

    await homePage.selectProduct('Samsung galaxy s6');

    await productPage.expectProductDetailDisplayed('Samsung galaxy s6');
  });

  test('user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCategory('Laptops');

    await homePage.expectProductDisplayed('Sony vaio i5');
  });
});