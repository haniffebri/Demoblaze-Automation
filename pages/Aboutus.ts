import { Page, Locator, expect } from '@playwright/test';

export class Aboutus {
  readonly page: Page;
  readonly poster: Locator;
  readonly bigPlayButton: Locator;
  readonly controlBar: Locator;
  readonly playNpauseButton: Locator;
  readonly muteUnmuteVolumeButton: Locator;
  readonly volumeBar: Locator;
  readonly progressBarVideo: Locator;
  readonly timeRemaining: Locator;
  readonly picInPic: Locator;
  readonly fullscreenButton: Locator;
  readonly contactXClose: Locator;
  readonly contactCloseButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.poster = page.locator('div.vjs-poster')
    this.bigPlayButton = page.locator('button:has-text("Play Video")')
    this.controlBar = page.locator('div.vjs-control-bar')
    this.playNpauseButton = page.locator('.vjs-play-control');
    this.muteUnmuteVolumeButton = page.locator('button:has-text("Play Video")')
    this.volumeBar = page.locator('div.vjs-volume-control.vjs-control.vjs-volume-horizontal')
    this.progressBarVideo = page.getByRole('slider', { name: 'Progress Bar' })
    this.timeRemaining = page.locator('button:has-text("Play Video")')
    this.picInPic = page.getByRole('button', { name: 'Picture-in-Picture' })
    this.fullscreenButton = page.getByRole('button', { name: 'Fullscreen' })
    this.contactXClose = page.locator('button.close:visible')
    this.contactCloseButton = page.locator('button.btn.btn-secondary:visible')
  }

  private async isPlaying(): Promise<boolean> {
    const classAttr = await this.playNpauseButton.getAttribute('class');
    return !classAttr?.includes('vjs-paused');
  }

  private async verifyVideoPlaying(): Promise<void> {
    await expect(this.controlBar).toBeVisible();
    await expect(this.playNpauseButton).not.toHaveClass(/vjs-paused/);
  }

  private async verifyVideoPaused(): Promise<void> {
    await expect(this.playNpauseButton).toHaveClass(/vjs-paused/);
  }

  async playVideoBigPlayButton(){
    await this.bigPlayButton.click()
    await this.page.waitForTimeout(3000);
    await this.verifyVideoPlaying();
  }

  async playVideoPoster(){
    await this.poster.click()
    await this.page.waitForTimeout(3000);
    await this.verifyVideoPlaying();
  }

  async playAndPauseVideo(){
    if (!(await this.isPlaying())) {
      await this.playNpauseButton.click();
      await this.verifyVideoPlaying();
    }

    // pause
    await this.playNpauseButton.click();
    await this.verifyVideoPaused();
    await this.page.waitForTimeout(3000);

    // play lagi
    await this.playNpauseButton.click();
    await this.page.waitForTimeout(3000);
    await this.verifyVideoPlaying();
  }

  async muteUnmuteVolume(){
    //mute
    await this.muteUnmuteVolumeButton.click
    await this.page.waitForTimeout(3000);
    await expect(this.muteUnmuteVolumeButton).toHaveClass(/vjs-vol-0/)

    //unmute
    await this.muteUnmuteVolumeButton.click
    await this.page.waitForTimeout(3000);
    await expect(this.muteUnmuteVolumeButton).not.toHaveClass(/vjs-vol-0/);
  }

  async controlVolume(){
    const box = await this.volumeBar.boundingBox();
    if (!box) throw new Error('Volume bar tidak ditemukan');

  // decrease ke 20% (klik dekat ujung kiri slider)
    await this.page.mouse.click(box.x + box.width * 0.2, box.y + box.height / 2);
    await this.page.waitForTimeout(3000);

    const decreasedValue = Number(await this.volumeBar.getAttribute('aria-valuenow'));
    expect(decreasedValue).toBeLessThan(50);

  // increase ke 80% (klik dekat ujung kanan slider)
    await this.page.mouse.click(box.x + box.width * 0.8, box.y + box.height / 2);
    await this.page.waitForTimeout(3000);

    const increasedValue = Number(await this.volumeBar.getAttribute('aria-valuenow'));
    expect(increasedValue).toBeGreaterThan(decreasedValue);
    }

  async progressBarControlVideo(){
    const box = await this.progressBarVideo.boundingBox();
    if (!box) throw new Error('Progress bar tidak ditemukan');

    const before = await this.progressBarVideo.getAttribute('aria-valuenow');

    // klik di tengah progress bar untuk seek ke ~50%
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(2000);

    const after = await this.progressBarVideo.getAttribute('aria-valuenow');
    expect(Number(after)).not.toBe(Number(before));
  }

  async verifyTimeRemaining(){
    const first = await this.timeRemaining.innerText();
    await this.page.waitForTimeout(3000);
    const second = await this.timeRemaining.innerText();

    // waktu tersisa harus berkurang (berbeda dari sebelumnya)
    expect(second).not.toBe(first);
  }

  async verifyPicInPic(){
    await this.picInPic.click
    const pipElement = await this.page.evaluate(() => document.pictureInPictureElement !== null);
    expect(pipElement).toBe(true);
  }

  async verifyFullscreen(){
    await this.fullscreenButton.click();
    const isFullscreen = await this.page.evaluate(() => document.fullscreenElement !== null);
    expect(isFullscreen).toBe(true);
  }

  async closeDialogXButton(){
    await this.contactXClose.click
    await expect(this.controlBar).toBeHidden();
  }

  async closeDialogCloseButton(){
    await this.contactCloseButton.click
    await expect(this.controlBar).toBeHidden();
  }
}