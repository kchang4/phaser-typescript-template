import * as Phaser from "phaser";

import MyGame from "./scene/my-game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1200,
    height: 1000,
  },
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [MyGame],
};

const game = new Phaser.Game(config);
