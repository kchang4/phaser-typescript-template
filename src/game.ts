import * as Phaser from "phaser";

import { PreloadScene } from "./scene/preload.scene";
import { TestScene } from "./scene/test.scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  url: "",
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "matter",
  },
  scene: [PreloadScene, TestScene],
};

const game = new Phaser.Game(config);
