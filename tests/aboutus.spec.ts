import { test } from '@playwright/test';
import { Home } from '../pages/Home';
import { Aboutus } from '../pages/AboutUs';

test.describe('Module: About Us', () => {
  let aboutus: Aboutus;
  let home: Home;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    aboutus = new Aboutus(page);

    await home.open();
    await home.openAboutus();
  });

  test('TC-ABS-001: Video can running by click poster', async () => {
    await aboutus.playVideoPoster
  });

  test('TC-ABS-002: Video can running by click big play button', async () => {
    await aboutus.playVideoBigPlayButton
  });

  test('TC-ABS-003: Play and pause video', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.playAndPauseVideo();
  });

  test('TC-ABS-004: Mute and unmute volume', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.muteUnmuteVolume();
  });

  test('TC-ABS-005: Volume decrease and increase control', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.controlVolume();
  });

  test('TC-ABS-006: Control progress bar of video', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.progressBarControlVideo();
  });

  test('TC-ABS-007: Time remaining decreases while video is playing', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.verifyTimeRemaining();
  });

  test('TC-ABS-008: Picture-in-picture mode', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.verifyPicInPic();
  });

  test('TC-ABS-009: Fullscreen mode', async () => {
    await aboutus.playVideoBigPlayButton();
    await aboutus.verifyFullscreen();
  });

  test('TC-ABS-010: Close dialog using X button', async () => {
    await aboutus.closeDialogXButton();
  });

  test('TC-ABS-011: Close dialog using Close button', async () => {
    await aboutus.closeDialogCloseButton();
  });
});