import * as Phaser from "phaser";

export default class UIHandler {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  buildGameText() {
    this.scene.dealCards = this.scene.add
      .text(960, 445, "Deal Cards")
      .setFontSize(14)
      .setFontFamily("Trebuchet MS");
  }

  buildUI() {
    this.buildGameText();
  }
}
