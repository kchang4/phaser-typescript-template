import * as Phaser from "phaser";

import { MyGameScene } from "./scene/my-game.scene";
import { Boot } from "./scene/boot";
import { Preload } from "./scene/preload";
import { MainMenu } from "./scene/main-menu";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   width: 1200,
  //   height: 1000,
  // },
  url: "",
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 30 },
      debug: false,
    },
  },
  //scene: [Boot, Preload, MainMenu],
  scene: [MyGameScene],
};

const game = new Phaser.Game(config);
