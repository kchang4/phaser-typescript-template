import { Player } from "../player";

export class TestScene extends Phaser.Scene {
  private player: Player;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "TestScene" });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.add.existing(new Player(this, 400, 400));
  }

  update(time: number, delta: number): void {
    this.player.setupMovement(this.cursors);
  }
}
