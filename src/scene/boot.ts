export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  preload() {}

  create() {
    this.scene.start("Preload");
  }

  update() {}
}
