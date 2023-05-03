export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.spritesheet("knight", "asset/swordman.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.scene.start("TestScene");
  }

  update() {}
}
