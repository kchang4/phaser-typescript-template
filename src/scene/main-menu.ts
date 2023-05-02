export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu", active: false });
  }

  preload() {}

  create() {
    const text = this.add.text(0, 0, "Main Menu");
  }

  update() {}
}
