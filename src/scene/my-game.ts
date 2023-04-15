import * as Phaser from "phaser";
import UIHandler from "../helper/ui-handler";

export default class MyGame extends Phaser.Scene {
  private uiHandler: UIHandler;

  constructor() {
    super({ key: "MyGame" });
    this.uiHandler = new UIHandler(this);
  }

  /**
   * Anything that happens before the game is created
   */
  preload() {}

  /**
   * When game is created, what happens on screen
   */
  create() {
    this.uiHandler.buildUI();
  }

  /**
   * Happens on every tick on the game
   */
  update() {}
}
