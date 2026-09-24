import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { Cart } from '../pages/Cart';

test.describe('Module: Cart', () => {
  let cart: Cart;
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    cart = new Cart(page);

    await home.open();
  });

  test('TC-Login-001: Validasi Penambahan 1 Produk', async () => {
  });

  test('TC-Login-002: Validasi Penambahan 2 Produk', async () => {
  });

  test('TC-Login-003: Validasi Kalkulasi Total Harga', async () => {
  });

  test('TC-Login-004: Validasi Penghapusan 1 Produk', async () => {
  });

  test('TC-Login-005: Validasi Penghapusan 2 Produk', async () => {
  });

  test('TC-Login-006: Interaksi Keranjang Kosong', async () => {
  });

  test('TC-Login-007: Validasi Modal Pemesanan', async () => {
  });
});