export class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload", active: false });
  }

  preload() {}

  create() {
    this.scene.start("MainMenu");
  }

  update() {}
}
