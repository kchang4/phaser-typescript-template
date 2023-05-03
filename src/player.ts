export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "knight");
    this.setupAnimations();
  }

  private setupAnimations() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 5 }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("knight", {
        frames: [6, 7, 8, 9, 10, 11],
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("knight", {
        frames: [18, 19, 20, 21, 22, 23],
      }),
      frameRate: 11,
      repeat: -1,
    });
  }

  setupMovement(cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursor.space.isDown) {
      this.anims.play("attack", true);
    } else if (
      !cursor.right.isDown &&
      !cursor.left.isDown &&
      !cursor.up.isDown &&
      !cursor.down.isDown
    ) {
      this.anims.play("idle", true);
    } else {
      this.anims.play("move", true);
    }

    if (cursor.right.isDown) {
      this.x += 1;
      if (this.scaleX !== 1) {
        this.setScale(1, 1);
      }
    }

    if (cursor.left.isDown) {
      this.x += -1;
      if (this.scaleX !== -1) {
        this.setScale(-1, 1);
      }
    }

    if (cursor.up.isDown) {
      this.y += -1;
    }

    if (cursor.down.isDown) {
      this.y += 1;
    }
  }
}
